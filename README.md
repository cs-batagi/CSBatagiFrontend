# CS Batağı Frontend

This is the frontend application for CS Batağı, a CS:GO/CS2 stats tracking and team management system.

## Features

- Player attendance tracking
- Team selection and management
- Match creation and management
- Player statistics visualization
- Performance tracking over time
- Duello (player vs player) statistics

## Technical Overview

The application uses:
- HTML, CSS (with Tailwind CSS), and JavaScript for the frontend
- Firebase Realtime Database for data storage and real-time updates
- Firebase Cloud Messaging for push notifications

## Data Management

All data is stored in Firebase Realtime Database with the following structure:
- `attendanceState`: Player attendance status
- `emojiState`: Player emoji status
- `seasonAvg`: Season average statistics
- `last10`: Last 10 matches statistics
- `nightAvg`: Night average statistics
- `sonMac`: Last match statistics
- `duelloSonMac`: Last match duello statistics
- `duelloSezon`: Season duello statistics
- `performanceData`: Historical performance data
- `teamPickerState`: Team selection state
- `matches`: Match data

## Scripts

- `firebase-data-init.js`: Initializes Firebase Realtime Database with data from local JSON files
- `firebase-data-update.js`: Updates Firebase Realtime Database with new data
- `MainScript.js`: Main application logic
- `attendance.js`: Attendance tracking functionality
- `statsTables.js`: Statistics tables functionality
- `sonMac.js`: Last match functionality
- `duello.js`: Duello statistics functionality
- `teamPicker.js`: Team selection functionality
- `players.js`: Player management functionality
- `performanceGraphs.js`: Performance graphs functionality
- `themeToggle.js`: Theme toggle functionality

## Recent Changes

- Removed Google Drive/Sheets dependency
- Removed Cloudflare Workers dependency
- Migrated all data storage and retrieval to Firebase Realtime Database
- Updated attendance tracking to use Firebase exclusively
- Updated match creation to use Firebase instead of API calls
