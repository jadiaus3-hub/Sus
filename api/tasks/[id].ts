import { VercelRequest, VercelResponse } from '@vercel/node';

// This will be handled by the main tasks.ts file
// Vercel will route /api/tasks/[id] requests to tasks.ts with the id parameter
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Redirect to main tasks handler
  const tasksHandler = await import('../tasks');
  return tasksHandler.default(req, res);
}