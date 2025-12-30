import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const prompt = searchParams.get('prompt');
  const width = searchParams.get('width') || '128';
  const height = searchParams.get('height') || '128';
  const nologo = searchParams.get('nologo') || 'true';

  if (!prompt) {
    return new NextResponse('Prompt is required', { status: 400 });
  }

  const encodedPrompt = encodeURIComponent(prompt);
  // Use the secret key from environment variables
  const apiKey = process.env.POLLINATIONS_SECRET_KEY || '';
  
  // Construct URL without key param
  const targetUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=${nologo}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'AxiomTrade/1.0', // Good practice
      }
    });

    if (!response.ok) {
        throw new Error(`Pollinations API returned ${response.status}`);
    }

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(blob, { headers });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
