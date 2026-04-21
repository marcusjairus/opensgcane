// -------- State Store --------
// Single source of truth for mode ('cane' | 'feather') and cane color.

// -------- Defaults --------

const DEFAULT_STATE = {
  mode: 'cane',
  color: 'red',
};

let state = { ...DEFAULT_STATE };
const listeners = new Set();

// -------- API --------

function initStore(initial = {}) {
  state = { ...DEFAULT_STATE, ...initial };
}

function getState() {
  return { ...state };
}

function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((fn) => fn(getState()));
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

module.exports = { initStore, getState, setState, subscribe };
