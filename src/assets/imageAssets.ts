const imageModules = import.meta.glob('./**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export const siteImages = [...new Set(Object.values(imageModules))]
