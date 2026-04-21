// -------- App Factory --------
// Wires state, overlay window, tray, and rest-cane sync together.

const { app } = require('electron');
const { createTray } = require('./tray/create-tray');
const { createOverlay, getOverlay } = require('./overlay/create-window');
const { loadConfig } = require('../libs/utils/config-util');
const { initStore, getState, subscribe } = require('./state/store');
const { sendRest } = require('../libs/utils/overlay-util');
const { registerShortcuts } = require('./shortcuts/register');

async function setup() {
  if (process.platform === 'darwin' && app.dock) app.dock.hide();

  const config = await loadConfig();
  // Always boot in cane mode — feather is an opt-in tool, not a sticky default.
  initStore({ ...config, mode: 'cane' });
  createOverlay();
  createTray();
  registerShortcuts();

  // Push the current state once the overlay is ready, and on every change.
  getOverlay().webContents.once('did-finish-load', () => {
    const { mode, color } = getState();
    sendRest(mode, color);
  });
  subscribe(({ mode, color }) => sendRest(mode, color));
}

module.exports = { setup };
