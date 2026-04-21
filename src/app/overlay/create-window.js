// -------- Overlay Window --------
// Transparent, click-through, always-on-top window covering the screen.
// Hosts the swing animation. Renderer listens for 'swing' IPC events.

const path = require('path');
const { BrowserWindow, screen } = require('electron');

let overlay;

function createOverlay() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  overlay = new BrowserWindow({
    width, height, x: 0, y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  overlay.setIgnoreMouseEvents(true);
  overlay.setAlwaysOnTop(true, 'screen-saver');
  overlay.loadFile(path.join(__dirname, 'overlay.html'));
  return overlay;
}

function getOverlay() {
  return overlay;
}

module.exports = { createOverlay, getOverlay };
