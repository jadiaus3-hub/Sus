export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const tasks = [
    {
      id: "1",
      title: "สวัสดี! นี่คือ Public Task Manager",
      completed: false,
      createdAt: "2025-08-11T07:00:00.000Z",
    },
    {
      id: "2", 
      title: "ทุกคนสามารถเพิ่ม แก้ไข และลบ tasks ได้",
      completed: false,
      createdAt: "2025-08-11T07:00:00.000Z",
    }
  ];
  
  return res.status(200).json(tasks);
}