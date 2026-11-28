'use strict';

const env = require('./config/env');
const { prisma, pgPool } = require('./db/prisma');
const { createApp } = require('./app');

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`\nIgloo Himalaya Treks CMS Server running on http://localhost:${env.port}`);
  console.log(`Admin Dashboard: http://localhost:${env.port}/admin`);
  console.log(`Health Check:    http://localhost:${env.port}/api/v1/health\n`);
});

async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Gracefully shutting down...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      await pgPool.end();
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
