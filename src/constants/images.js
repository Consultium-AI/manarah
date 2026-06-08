const base = import.meta.env.BASE_URL

export const COUNTRY_IMAGES = {
  PS: `${base}assets/Palestina.webp`,
  SD: `${base}assets/Sudan.webp`,
  YE: `${base}assets/jemen.jpg`,
}

export const VOLUNTEER_IMAGE = `${base}assets/volunteer.jpg`

export const assetUrl = (path) =>
  path.startsWith('/assets/')
    ? `${base}${path.slice(1)}`
    : path
