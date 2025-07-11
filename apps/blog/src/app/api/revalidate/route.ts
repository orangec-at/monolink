import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Verify secret (for security)
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate specific path or all paths
    if (path) {
      revalidatePath(path);
    } else {
      // Revalidate common paths
      revalidatePath('/');
      revalidatePath('/articles/[slug]', 'page');
    }

    return NextResponse.json({ 
      revalidated: true, 
      path: path || 'all paths',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'ISR Revalidation webhook endpoint',
    usage: 'POST with { "path": "/path/to/revalidate", "secret": "your-secret" }'
  });
}