import emailjs from '@emailjs/browser';

const DEFAULT_PUBLIC_KEY = 'EBq1uhe_ql2S211q8';
const TO_EMAIL = 'stichtingmanarah@gmail.com';

/** Zelfde {{title}}-waarden als in het hoofdproject (eén EmailJS-template). */
export const EMAILJS_FORM_TITLE = {
  contactHomeEnPagina: 'Contact — home- en contactpagina',
  samenInActie: 'Samen in actie (help mee)',
  manarahLandingspagina: 'Contact — Manarah landingspagina',
} as const;

export function getEmailJsConfig() {
  return {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || DEFAULT_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  };
}

export function isEmailJsReady() {
  const { serviceId, templateId } = getEmailJsConfig();
  return Boolean(serviceId && templateId);
}

function buildMessageBody(
  text: string,
  fromEmail: string,
  phone: string,
  interest: string
) {
  const parts: string[] = [text || ''];
  if (fromEmail) parts.push('', `E-mail: ${fromEmail}`);
  if (phone) parts.push(`Telefoon: ${phone}`);
  if (interest) parts.push(`Interesse: ${interest}`);
  return parts.join('\n');
}

export type SiteEmailParams = {
  formName: string;
  fromName: string;
  fromEmail: string;
  message: string;
  phone?: string;
  interest?: string;
};

/** Template: {{title}} in onderwerp, {{name}} {{time}} {{message}} in de inhoud. */
export async function sendSiteEmail({
  formName,
  fromName,
  fromEmail,
  message,
  phone = '',
  interest = '',
}: SiteEmailParams) {
  const { publicKey, serviceId, templateId } = getEmailJsConfig();
  if (!serviceId || !templateId) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }
  const time = new Date().toLocaleString('nl-NL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return emailjs.send(
    serviceId,
    templateId,
    {
      title: formName,
      name: fromName || '—',
      time,
      message: buildMessageBody(message, fromEmail, phone, interest),
    },
    { publicKey }
  );
}

export { TO_EMAIL };
