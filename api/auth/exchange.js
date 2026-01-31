export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, redirect_uri } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('Missing Google OAuth credentials');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirect_uri || `${req.headers.origin}`,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Google token exchange failed:', tokenData);
      return res.status(400).json({
        error: 'Token exchange failed',
        details: tokenData.error_description || tokenData.error
      });
    }

    const { access_token, refresh_token, expires_in, token_type } = tokenData;

    // Set refresh token as HTTP-only cookie (180 days)
    if (refresh_token) {
      const cookieOptions = [
        `refresh_token=${refresh_token}`,
        'HttpOnly',
        'Secure',
        'SameSite=Strict',
        'Path=/',
        `Max-Age=${180 * 24 * 60 * 60}`, // 180 days in seconds
      ];
      res.setHeader('Set-Cookie', cookieOptions.join('; '));
    }

    // Return access token to frontend (stored in memory only)
    return res.status(200).json({
      access_token,
      expires_in,
      token_type,
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
