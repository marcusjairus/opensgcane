#!/usr/bin/env node

// -------- CLI Entry --------
// Launches the Electron app when `opensgcane` is run from the terminal.
// Clears ELECTRON_RUN_AS_NODE so Electron boots as an app, not plain Node.

const { spawn } = require('child_process');
const path = require('path');
const electron = require('electron');

const projectRoot = path.join(__dirname, '..');
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electron, [projectRoot], { stdio: 'inherit', env });
child.on('exit', (code) => process.exit(code ?? 0));
