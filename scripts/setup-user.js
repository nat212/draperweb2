const { initializeEmulatorAdmin } = require('./emulator-admin-firebase');

const app = initializeEmulatorAdmin('draperweb-2');

(async () => {
  await app.auth().createUser({
    uid: 'r9uVyfn8dZSaGlfgn7hWoV8ofUN2',
    email: 'natasha@draper.net.za',
    password: 'y#KB&2ZMQ7nfejBWl^nA',
    displayName: 'Natasha',
  });
  console.log('User created successfully');
  process.exit();
})();
