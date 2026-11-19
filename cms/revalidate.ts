import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

/** Any CMS change refreshes the cached site content. Silently skipped outside Next (seed, CLI). */
async function refresh() {
  try {
    const { revalidateTag, revalidatePath } = await import('next/cache');
    revalidateTag('cms', { expire: 0 });
    revalidatePath('/', 'layout');
  } catch { /* not running inside Next */ }
}
export const afterChange: CollectionAfterChangeHook = async ({ doc }) => { await refresh(); return doc; };
export const afterDelete: CollectionAfterDeleteHook = async ({ doc }) => { await refresh(); return doc; };
export const globalAfterChange: GlobalAfterChangeHook = async ({ doc }) => { await refresh(); return doc; };
export const revalidateHooks = { afterChange: [afterChange], afterDelete: [afterDelete] };
