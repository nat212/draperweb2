import * as admin from 'firebase-admin';
import Credential = admin.credential.Credential;

const FIRESTORE_URL = 'localhost:8282';
const AUTH_URL = 'localhost:9099';
const PROJECT_ID = 'draperweb-2';

function initializeEmulatorVariables() {
  process.env.FIRESTORE_EMULATOR_HOST = FIRESTORE_URL;
  process.env.FIREBASE_AUTH_EMULATOR_HOST = AUTH_URL;
}

export function initializeEmulatorAdmin(name: string | undefined, credential?: Credential) {
  initializeEmulatorVariables();

  const options = {
    projectId: PROJECT_ID,
  };

  if (credential) {
    // @ts-ignore
    options.credential = credential;
  }

  return admin.apps.length ? admin.app(name) : admin.initializeApp(options, name);
}
