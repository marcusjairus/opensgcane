// -------- Config Utility --------
// Persists user prefs (mode + color) in Electron's userData folder.

const path = require('path');
const { promises: fs } = require('fs');
const { app } = require('electron');

function configPath() {
  return path.join(app.getPath('userData'), 'config.json');
}

async function loadConfig() {
  try {
    const raw = await fs.readFile(configPath(), 'utf8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Serialize writes: two saves in quick succession (e.g. rapid
// mode + colour clicks) could race on read-modify-write and drop
// one of the patches, making the next launch restore stale state.
let writeChain = Promise.resolve();

function saveConfig(patch) {
  writeChain = writeChain.then(async () => {
    const current = await loadConfig();
    const next = { ...current, ...patch };
    await fs.writeFile(configPath(), JSON.stringify(next, null, 2));
  }).catch((err) => {
    console.error('[opensgcane] saveConfig failed:', err);
  });
  return writeChain;
}

module.exports = { loadConfig, saveConfig };
