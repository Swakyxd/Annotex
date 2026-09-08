import express from 'express';

export async function createTestApp() {
  const { initializeApp } = await import('../../app.js');
  const app = express();
  initializeApp(app);
  return app;
}
