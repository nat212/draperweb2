"use strict";
exports.__esModule = true;
exports.initializeEmulatorAdmin = void 0;
var admin = require("firebase-admin");
var FIRESTORE_URL = 'localhost:8282';
var AUTH_URL = 'localhost:9099';
var PROJECT_ID = 'draperweb-2';
function initializeEmulatorVariables() {
    process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_URL;
    process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH_URL;
}
function initializeEmulatorAdmin(name, credential) {
    initializeEmulatorVariables();
    var options = {
        projectId: PROJECT_ID
    };
    if (credential) {
        // @ts-ignore
        options.credential = credential;
    }
    return admin.apps.length ? admin.app(name) : admin.initializeApp(options, name);
}
exports.initializeEmulatorAdmin = initializeEmulatorAdmin;
