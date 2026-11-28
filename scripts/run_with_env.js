'use strict';

require('dotenv').config({ override: true });
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/run_with_env.js <command> [...args]');
  process.exit(1);
}

const result = spawnSync(args[0], args.slice(1), {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env }
});

process.exit(result.status === null ? 1 : result.status);
