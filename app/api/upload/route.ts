import cloudinary from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

import { Readable } from 'stream';

// Helper function to handle the file upload to Cloudinary
const uploadImageToCloudinary = async (file: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { upload_preset: 'ml_default' }, // Adjust based on your Cloudinary settings
      (error, result) => {
        if (error) {
          reject(new Error('Image upload failed'));
        } else {
          resolve(result?.secure_url || '');
        }
      }
    );

    // Convert buffer to stream
    const readableStream = Readable.from(file);
    readableStream.pipe(stream);
  });
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary(buffer);

    return NextResponse.json({ status: 200, url: imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
