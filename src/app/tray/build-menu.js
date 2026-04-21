// -------- Build Tray Menu --------
// Every action item shows its shortcut right-aligned via `accelerator`.
// Accelerators are display-only in Tray menus — globalShortcut does the
// actual binding in shortcuts/register.

const { app } = require('electron');
const { getState, setState } = require('../state/store');
const { fire } = require('../actions/fire');
const { saveConfig } = require('../../libs/utils/config-util');
const {
  FIRE_KEY, SWAP_KEY, COLOR_KEY, COLOR_ORDER, swapTool, cycleColor,
} = require('../shortcuts/register');

const QUIT_KEY = 'Ctrl+Q';

function buildMenu() {
  const { mode, color } = getState();
  const fireLabel = mode === 'cane' ? 'Cane him! (whack)' : 'Dust him! (clean)';
  return [
    { label: fireLabel, accelerator: FIRE_KEY, click: fire },
    { type: 'separator' },
    toolItem('cane', mode, 'Cane (whack)'),
    toolItem('feather', mode, 'Feather duster (clean)'),
    { label: 'Swap tool', accelerator: SWAP_KEY, click: swapTool },
    { type: 'separator' },
    { label: 'Cycle cane colour', accelerator: COLOR_KEY, click: cycleColor },
    { label: 'Cane colour', submenu: COLOR_ORDER.map((c) => colorItem(c, color)) },
    { type: 'separator' },
    { label: 'Quit', accelerator: QUIT_KEY, click: () => app.quit() },
  ];
}

const radioItem = (value, active, label, patch) => ({
  label, type: 'radio', checked: active === value, click: () => update(patch),
});

const toolItem  = (value, active, label) => radioItem(value, active, label, { mode: value });
const colorItem = (value, active) =>
  radioItem(value, active, capitalize(value), { color: value });

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

function update(patch) {
  setState(patch);
  saveConfig(patch);
}

module.exports = { buildMenu };
