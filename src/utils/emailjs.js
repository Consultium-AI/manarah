import emailjs from '@emailjs/browser'

const DEFAULT_PUBLIC_KEY = 'EBq1uhe_ql2S211q8'
const TO_EMAIL = 'stichtingmanarah@gmail.com'

/** Vult {{title}} in je EmailJS-onderwerp (bijv. "Contact Us: {{title}}"). */
export const EMAILJS_FORM_TITLE = {
  contactHomeEnPagina: 'Contact — home- en contactpagina',
  samenInActie: 'Samen in actie (help mee)',
  manarahLandingspagina: 'Contact — Manarah landingspagina'
}

export function getEmailJsConfig () {
  return {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || DEFAULT_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
  }
}

export function isEmailJsReady () {
  const { serviceId, templateId } = getEmailJsConfig()
  return Boolean(serviceId && templateId)
}

function buildMessageBody (text, { fromEmail, phone, interest }) {
  const parts = [text || '']
  if (fromEmail) parts.push('', `E-mail: ${fromEmail}`)
  if (phone) parts.push(`Telefoon: ${phone}`)
  if (interest) parts.push(`Interesse: ${interest}`)
  return parts.join('\n')
}

/**
 * Template "Contact Us" in EmailJS: subject bevat {{title}}; content {{name}}, {{time}}, {{message}}.
 * Ontvanger stel je in bij de service / template-instellingen op stichtingmanarah@gmail.com.
 */
export async function sendSiteEmail ({
  formName,
  fromName,
  fromEmail,
  message,
  phone = '',
  interest = ''
}) {
  const { publicKey, serviceId, templateId } = getEmailJsConfig()
  if (!serviceId || !templateId) {
    throw new Error('EMAILJS_NOT_CONFIGURED')
  }
  const time = new Date().toLocaleString('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
  return emailjs.send(
    serviceId,
    templateId,
    {
      title: formName,
      name: fromName || '—',
      time,
      message: buildMessageBody(message, { fromEmail, phone, interest })
    },
    { publicKey }
  )
}

export { TO_EMAIL }
