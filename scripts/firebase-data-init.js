// Firebase Data Initialization Script
// This script replaces the Google Drive/Sheets integration with Firebase Realtime Database

const firebase = require('firebase/app');
require('firebase/database');
const fs = require('fs');
const path = require('path');

// Firebase configuration (same as in MainScript.js)
const firebaseConfig = {
  apiKey: "AIzaSyAJpmATHX2Zugnm4c1WhU5Kg9iMOruiZBU",
  authDomain: "csbatagirealtimedb.firebaseapp.com",
  databaseURL: "https://csbatagirealtimedb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "csbatagirealtimedb",
  storageBucket: "csbatagirealtimedb.firebasestorage.app",
  messagingSenderId: "408840223663",
  appId: "1:408840223663:web:bdcf576d64b3a1fb6c4d5a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Database paths
const DB_PATHS = {
  ATTENDANCE_STATE: 'attendanceState',
  EMOJI_STATE: 'emojiState',
  SEASON_AVG: 'seasonAvg',
  LAST10: 'last10',
  NIGHT_AVG: 'nightAvg',
  SON_MAC: 'sonMac',
  DUELLO_SON_MAC: 'duelloSonMac',
  DUELLO_SEZON: 'duelloSezon',
  PERFORMANCE_DATA: 'performanceData',
  KABILE: 'kabile',
  MAPS: 'maps'
};

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to write data to Firebase
async function writeToFirebase(path, data) {
  try {
    await database.ref(path).set(data);
    console.log(`✅ Data written to Firebase at ${path}`);
    return true;
  } catch (error) {
    console.error(`❌ Error writing to Firebase at ${path}:`, error);
    return false;
  }
}

// Initialize all data in Firebase
async function initializeFirebaseData() {
  console.log('Starting Firebase data initialization...');
  
  const dataDir = path.join(__dirname, '..', 'data');
  
  // Initialize season_avg.json
  const seasonAvgData = readJsonFile(path.join(dataDir, 'season_avg.json'));
  if (seasonAvgData) {
    await writeToFirebase(DB_PATHS.SEASON_AVG, seasonAvgData);
  }
  
  // Initialize last10.json
  const last10Data = readJsonFile(path.join(dataDir, 'last10.json'));
  if (last10Data) {
    await writeToFirebase(DB_PATHS.LAST10, last10Data);
  }
  
  // Initialize night_avg.json
  const nightAvgData = readJsonFile(path.join(dataDir, 'night_avg.json'));
  if (nightAvgData) {
    await writeToFirebase(DB_PATHS.NIGHT_AVG, nightAvgData);
  }
  
  // Initialize sonmac.json
  const sonMacData = readJsonFile(path.join(dataDir, 'sonmac.json'));
  if (sonMacData) {
    await writeToFirebase(DB_PATHS.SON_MAC, sonMacData);
  }
  
  // Initialize duello_son_mac.json
  const duelloSonMacData = readJsonFile(path.join(dataDir, 'duello_son_mac.json'));
  if (duelloSonMacData) {
    await writeToFirebase(DB_PATHS.DUELLO_SON_MAC, duelloSonMacData);
  }
  
  // Initialize duello_sezon.json
  const duelloSezonData = readJsonFile(path.join(dataDir, 'duello_sezon.json'));
  if (duelloSezonData) {
    await writeToFirebase(DB_PATHS.DUELLO_SEZON, duelloSezonData);
  }
  
  // Initialize performance_data.json
  const performanceData = readJsonFile(path.join(dataDir, 'performance_data.json'));
  if (performanceData) {
    await writeToFirebase(DB_PATHS.PERFORMANCE_DATA, performanceData);
  }
  
  // Initialize kabile.json
  const kabileData = readJsonFile(path.join(dataDir, 'kabile.json'));
  if (kabileData) {
    await writeToFirebase(DB_PATHS.KABILE, kabileData);
  }
  
  // Initialize maps.json
  const mapsData = readJsonFile(path.join(dataDir, 'maps.json'));
  if (mapsData) {
    await writeToFirebase(DB_PATHS.MAPS, mapsData);
  }
  
  console.log('✅ Firebase data initialization completed');
}

// Run the initialization
initializeFirebaseData().then(() => {
  console.log('Firebase initialization script completed.');
  process.exit(0);
}).catch(error => {
  console.error('Error in Firebase initialization script:', error);
  process.exit(1);
});