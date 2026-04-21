/**
 * Static project data - used when backend is not deployed.
 * All projects are defined here with i18n keys for name and description.
 */

export const STATIC_PROJECTS = [
  // Ramadan 2025 - Voltooid (Syrië)
  {
    id: 'ramadan-2025',
    nameKey: 'projects.ramadan-2025-name',
    descriptionKey: 'projects.ramadan-2025-description',
    aboutKey: 'projects.ramadan-2025-about',
    country_code: 'SY',
    status: 'completed',
    target_amount: 6500,
    current_amount: 6500,
    donation_count: 0,
    total_sent: 6500,
    image_url: '/assets/syrie-2025-3.jpeg',
  },
  // Ramadan 2026 - Voltooid (Syrië)
  {
    id: 'ramadan-2026',
    nameKey: 'projects.ramadan-2026-name',
    descriptionKey: 'projects.ramadan-2026-description',
    aboutKey: 'projects.ramadan-2026-about',
    country_code: 'SY',
    status: 'completed',
    target_amount: 2500,
    current_amount: 2500,
    donation_count: 0,
    total_sent: 2500,
    image_url: '/assets/huidig-project-foto.jpeg',
  },
  // Jemen - Voltooid
  {
    id: 'static-yemen',
    nameKey: 'projects.old-yemen-title',
    descriptionKey: 'projects.old-yemen-description',
    aboutKey: 'projects.old-yemen-about',
    country_code: 'YE',
    status: 'completed',
    image_url: '/assets/jemen.jpeg',
  },
  // Palestina - Voltooid
  {
    id: 'static-palestine',
    nameKey: 'projects.old-palestine-title',
    descriptionKey: 'projects.old-palestine-description',
    aboutKey: 'projects.old-palestine-about',
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
    about: p.aboutKey ? t(p.aboutKey) : t(p.descriptionKey),
  }))
}
