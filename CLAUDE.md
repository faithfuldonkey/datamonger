# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm start       # Run development server at http://localhost:3000
npm test        # Run tests in interactive watch mode
npm run build   # Production build to /build folder
```

## What This App Does

Datamonger is a React application that connects to Google Calendar to track and analyze recurring events (called "trackers"). Users sign in with Google OAuth, select a calendar, and view statistics about their events grouped by event title/summary.

## Architecture Overview

**Authentication Flow**: The app uses `@react-oauth/google` for Google OAuth. Access tokens are stored in localStorage with expiration tracking. The main authentication logic lives in `App.js` (not in the AuthContext, which is mostly scaffolding).

**Data Flow**:
1. Google Calendar events are fetched via the Calendar API in `App.js:fetchAllEvents()`
2. Events are grouped by their `summary` field using `utils/groupEvents.js:groupEventsBySummary()`
3. The grouped events power the main views: `GroupedEvents` (list of all trackers) and `TrackerDetails` (single tracker view)

**State Management**: Primary state lives in `App.js`:
- `accessToken`, `events`, `groupedEvents` - core data
- `calendarId`, `startDate`, `endDate` - filtering
- `selectedGroup` - which tracker is being viewed

Context providers (`AuthContext`, `EventsContext`) exist but aren't heavily used; most state flows through props from `App.js`.

## Component Organization

Components follow a pattern: `ComponentName/ComponentName.js` with companion `ComponentName.styles.js` for styled-components.

**Key directories**:
- `components/Trackers/` - Main tracker views (`TrackerDetails`, `TrackerList`, `Tracker`)
- `components/Statistics/Statistics/` - Individual stat cards (`TimeSinceLast`, `TotalCount`, `AverageTimeBetween`, `LongestDailyStreak`, `MostIn24Hours`, `LongestStreakWithout`)
- `components/Common/` - Reusable components (`Table`, `Button`, `LoadingSpinner`)
- `utils/` - `formatters.js` (date/time formatting), `constants.js` (color palette), `groupEvents.js`

## Styling

Uses styled-components throughout. Global styles are in `styles/GlobalStyles.js`. Color constants for trackers are in `utils/constants.js`.
