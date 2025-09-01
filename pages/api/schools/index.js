import multer from 'multer';
import { connectDB } from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup (memory storage)
const upload = multer({ storage: multer.memoryStorage() });
export const config = { api: { bodyParser: false } };

// helper to run multer in Next.js
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, upload.single('image'));
      const { name, address, city, state, contact, email_id } = req.body;

      // upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'schools' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      const db = await connectDB();
      await db.execute(
        'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, email_id, result.secure_url]
      );

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  if (req.method === 'GET') {
    try {
      const db = await connectDB();
      const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC');
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database fetch failed' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
