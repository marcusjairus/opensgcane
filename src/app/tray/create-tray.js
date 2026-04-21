// -------- Create Tray --------
// Menubar icon. macOS shows a 🪵 emoji title (SVG tray icons render flakily
// via data URLs); Win/Linux get the same title and an empty icon slot.

const { Tray, Menu, nativeImage } = require('electron');
const { buildMenu } = require('./build-menu');
const { subscribe } = require('../state/store');

function createTray() {
  const tray = new Tray(nativeImage.createEmpty());
  tray.setTitle('🪵');
  tray.setToolTip('OpenSGCane — cane and feather for Claude Code');
  refresh(tray);
  subscribe(() => refresh(tray));
  return tray;
}

function refresh(tray) {
  tray.setContextMenu(Menu.buildFromTemplate(buildMenu()));
}

module.exports = { createTray };
