import { GeneralError } from '@utils/genral-error';
import { S3 } from 'aws-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
const ACCESSKEY = process.env.LIARA_ACCESS_KEY;
const SECRETKEY = process.env.LIARA_SECRET_KEY;
const ENDPOINT = process.env.LIARA_ENDPOINT;
const BUCKET = process.env.LIARA_BUCKET_NAME;
const s3 = new S3({
  accessKeyId: ACCESSKEY,
  secretAccessKey: SECRETKEY,
  
});
export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }
  const ext = extname(file.name);
  const filename = `${uuidv4()}${ext}`;

  const params = {
    Bucket: BUCKET!,
    Key: filename,
    Body: Buffer.from(await file.arrayBuffer()),
    ACL: 'public-read',
    ContentType: file.type,
    ContentDisposition: 'inline',
    CreateBucketConfiguration: {
      LocationConstraint: 's3.ir-thr-at1.arvanstorage.ir',
    },
  };
  try {
    const upload = s3.upload(params);
    const res = await upload.promise();

    return NextResponse.json({ source: res?.Key });
  } catch (err: any) {
    // TODO error
    throw new GeneralError(err);
  }
}
