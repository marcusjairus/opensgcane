// -------- Electron Entry Point --------
// Bootstraps the app. Real wiring lives in app/setup.

const { app } = require('electron');
const { setup } = require('./app/setup');

app.whenReady().then(setup).catch((err) => {
  console.error('[opensgcane] failed to start:', err);
  app.exit(1);
});

// Keep the app alive when all windows close — we live in the tray.
app.on('window-all-closed', (event) => event.preventDefault());
