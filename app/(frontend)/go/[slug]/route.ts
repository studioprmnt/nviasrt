import { NextResponse } from 'next/server';
import { getContent } from '@/lib/data';

// Clean affiliate redirect: /go/<product> → store link.
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (await getContent()).products.find(x => x.slug === slug);
  console.log(`[affiliate-click] ${slug} from ${req.headers.get('referer') ?? 'direct'}`);
  return NextResponse.redirect(p?.url ?? new URL('/shop', req.url), 302);
}
