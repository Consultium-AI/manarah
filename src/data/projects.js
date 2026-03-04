/**
 * Static project data - used when backend is not deployed.
 * All projects are defined here with i18n keys for name and description.
 */

export const STATIC_PROJECTS = [
  // Ramadan 2025 - Voltooid
  {
    id: 'ramadan-2025',
    nameKey: 'projects.ramadan-2025-name',
    descriptionKey: 'projects.ramadan-2025-description',
    country_code: 'NL',
    status: 'completed',
    target_amount: 1900,
    current_amount: 1900,
    donation_count: 0,
    total_sent: 1900,
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1920&q=80',
  },
  // Ramadan 2026 - Actief
  {
    id: 'ramadan-2026',
    nameKey: 'projects.ramadan-2026-name',
    descriptionKey: 'projects.ramadan-2026-description',
    country_code: 'NL',
    status: 'active',
    target_amount: 2500,
    current_amount: 350,
    donation_count: 0,
    total_sent: 0,
    image_url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1920&q=80',
  },
  // Jemen - Voltooid
  {
    id: 'static-yemen',
    nameKey: 'projects.old-yemen-title',
    descriptionKey: 'projects.old-yemen-description',
    country_code: 'YE',
    status: 'completed',
  },
  // Palestina - Voltooid
  {
    id: 'static-palestine',
    nameKey: 'projects.old-palestine-title',
    descriptionKey: 'projects.old-palestine-description',
    country_code: 'PS',
    status: 'completed',
  },
]

/**
 * Resolve static projects with translated names/descriptions
 */
export const getStaticProjects = (t) => {
  return STATIC_PROJECTS.map((p) => ({
    ...p,
    name: t(p.nameKey),
    description: t(p.descriptionKey),
  }))
}
