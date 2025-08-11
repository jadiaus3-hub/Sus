import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const tasks = [
      {
        id: "1",
        title: "สวัสดี! นี่คือ Public Task Manager",
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2", 
        title: "ทุกคนสามารถเพิ่ม แก้ไข และลบ tasks ได้",
        completed: false,
        createdAt: new Date().toISOString(),
      }
    ];
    
    return res.status(200).json(tasks);
  }

  return res.status(405).json({ message: "Method not allowed" });
}