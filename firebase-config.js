// ============================================================
//  GATE #1 — Jungle Park · Firebase configuration
// ------------------------------------------------------------
//  Realtime Database · projet `gate1-jp` · europe-west1
//  Règles temporaires (atelier éphémère) :
//    { "rules": { ".read": true, ".write": true } }
//  → À durcir après l'atelier du 22 mai.
// ============================================================

window.firebaseConfig = {
  apiKey: "AIzaSyCLBbWjJAICS4tgbsomzScjQRfhTyTOo1M",
  authDomain: "gate1-jp.firebaseapp.com",
  databaseURL: "https://gate1-jp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gate1-jp",
  storageBucket: "gate1-jp.firebasestorage.app",
  messagingSenderId: "82518234530",
  appId: "1:82518234530:web:b821d6627c0bba3a690efb"
};

// Session ID : isole la session sur Firebase. Garde
// "gate1-jp-2026-05-22" pour la séance officielle.
// Change-le pour un test à blanc (ex. "test-001").
window.SESSION_ID = "gate1-jp-2026-05-22";
