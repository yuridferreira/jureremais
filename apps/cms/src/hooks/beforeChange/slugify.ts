import type { CollectionBeforeChangeHook } from 'payload'

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export const slugifyHook: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  collection,
}) => {
  if (operation === 'create' || (operation === 'update' && data.name)) {
    const sourceField = data.name ?? data.title
    if (sourceField && !data.slug) {
      data.slug = toSlug(String(sourceField))
    }
  }
  return data
}
