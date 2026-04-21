// -------- Preload --------
// Exposes a safe bridge from main → renderer. Two channels:
//   onRest:  update the resting cane (src + flip) without animating.
//   onSwing: fire the full swing animation + smack sound.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('sgcane', {
  onRest:  (cb) => ipcRenderer.on('rest',  (_e, payload) => cb(payload)),
  onSwing: (cb) => ipcRenderer.on('swing', (_e, payload) => cb(payload)),
});
