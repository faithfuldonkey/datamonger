export const loadGoogleApi = (callback) => {
  if (window.google) {
    // If already loaded, execute the callback
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.defer = true;

  script.onload = () => {
    console.log("Google API loaded successfully.");
    callback();
  };

  script.onerror = () => {
    console.error("Failed to load Google API.");
  };

  document.head.appendChild(script);
};
