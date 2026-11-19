'use server';
import config from '@payload-config';
import { getPayload } from 'payload';

type Result = { ok: boolean };
const str = (f: FormData, k: string, max = 5000) => String(f.get(k) ?? '').trim().slice(0, max);
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export async function subscribe(form: FormData): Promise<Result> {
  if (str(form, 'website')) return { ok: true }; // honeypot: bots fill hidden fields
  const email = str(form, 'email', 320).toLowerCase();
  if (!emailOk(email)) return { ok: false };
  const payload = await getPayload({ config });
  const existing = await payload.count({ collection: 'subscribers', where: { email: { equals: email } } });
  if (!existing.totalDocs) await payload.create({ collection: 'subscribers', data: { email } });
  return { ok: true };
}

export async function sendMessage(form: FormData): Promise<Result> {
  if (str(form, 'website')) return { ok: true };
  const data = {
    name: str(form, 'name', 200), email: str(form, 'email', 320), topic: str(form, 'topic', 300) || undefined,
    message: str(form, 'message'), source: (str(form, 'source') === 'work-with-me' ? 'work-with-me' : 'contact') as 'contact' | 'work-with-me',
  };
  if (!data.name || !data.message || !emailOk(data.email)) return { ok: false };
  const payload = await getPayload({ config });
  await payload.create({ collection: 'messages', data });
  return { ok: true };
}
