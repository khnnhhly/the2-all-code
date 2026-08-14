import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { revalidatePath } from 'next/cache';

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) {
      return NextResponse.json({ message: 'Missing signature header' }, { status: 401 });
    }

    const body = await req.text();

    if (SANITY_WEBHOOK_SECRET && !isValidSignature(body, signature, SANITY_WEBHOOK_SECRET)) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    const jsonBody = JSON.parse(body);
    const docType = jsonBody?._type;

    // Revalidate the pages
    // Since we are revalidating, we can revalidate the home page or all pages
    revalidatePath('/', 'layout');

    return NextResponse.json({ revalidated: true, now: Date.now(), type: docType });
  } catch (error: any) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
