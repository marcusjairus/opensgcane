// -------- Overlay Utility --------
// Builds the IPC payload (src + mode) for the current state and sends
// either a 'rest' or 'swing' event to the overlay window.
//   cane    → cane-<color>.svg (colour picked by user)
//   feather → feather-duster.svg (natural tan, no colour variants)

const path = require('path');
const { getOverlay } = require('../../../app/overlay/create-window');

function assetFor(mode, color) {
  return mode === 'feather' ? 'feather-duster.svg' : `cane-${color}.svg`;
}

function buildPayload(mode, color) {
  const src = `file://${path.join(__dirname, '../../../../assets', assetFor(mode, color))}`;
  return { src, mode };
}

function sendRest(mode, color) {
  getOverlay()?.webContents.send('rest', buildPayload(mode, color));
}

function sendSwing(mode, color) {
  getOverlay()?.webContents.send('swing', buildPayload(mode, color));
}

module.exports = { sendRest, sendSwing };
