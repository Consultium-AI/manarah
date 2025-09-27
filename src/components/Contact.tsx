import Reveal from './Reveal';
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const quickChoices: string[] = [];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Nieuw bericht van ${name || 'website bezoeker'}`;
    const body = `${message}\n\nNaam: ${name}\nE-mail: ${email}`;
    window.location.href = `mailto:info@stichtingmanarah.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="relative py-20 will-change-auto bg-white text-gray-900">
      <div className="container-max">
        <Reveal>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-8 text-center">
            <span className="inline-block bg-sky-200 px-3 py-2 rounded-md mr-2 text-blue-800">Neem contact op</span>
          </h3>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-gray-700 text-lg text-center max-w-3xl mx-auto -mt-4 mb-8">
            Heb je vragen, suggesties of wil je samenwerken? Laat een bericht achter.
          </p>
        </Reveal>

        <div className="grid gap-8">
          {/* Form card */}
          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto">

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Naam</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 px-4 py-3" placeholder="Jouw naam" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">E-mailadres</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 px-4 py-3" placeholder="naam@voorbeeld.nl" />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">Bericht <span className="text-red-500">*</span></label>
                {/* Snelle keuzes verwijderd op verzoek */}
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 px-4 py-3" placeholder="Stel hier je vraag..." />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button type="submit" className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:opacity-95 text-white px-6 py-3 rounded-xl font-semibold shadow">Versturen</button>
                <span className="text-sm text-gray-500">of stuur direct een mail naar <a href="mailto:info@stichtingmanarah.nl" className="text-blue-600 hover:underline">info@stichtingmanarah.nl</a></span>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Door dit formulier te verzenden, ga je akkoord met onze verwerking van persoonsgegevens zoals uitgelegd in onze
                {' '}<a href="https://stichtingmanarah.nl/assets/docs/privacyverklaring.pdf" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">privacyverklaring</a>.
                {' '}Raadpleeg ook onze{' '}<a href="https://stichtingmanarah.nl/assets/docs/voorwaarden.pdf" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">algemene voorwaarden</a>{' '}en{' '}<a href="https://stichtingmanarah.nl/assets/docs/contactverklaring.pdf" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">contactverklaring</a>.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="max-w-4xl mx-auto mt-2">
              <p className="text-center text-gray-600 mb-3">Of neem direct contact op via WhatsApp</p>
              <a
                href="https://wa.me/31103602862"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                  <path d="M20.52 3.48A11.78 11.78 0 0 0 12.01 0C5.38.01.02 5.38.01 12.01c0 2.12.56 4.19 1.62 6.01L0 24l6.14-1.6a11.9 11.9 0 0 0 5.86 1.53h.01c6.63 0 12.01-5.37 12.01-12s-5.36-8.45-3.5-8.45Zm-8.5 18.97h-.01a9.9 9.9 0 0 1-5.03-1.37l-.36-.21-3.64.95.97-3.55-.24-.37A9.88 9.88 0 0 1 2.1 12C2.11 6.94 6.35 2.7 11.41 2.69c2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.07-4.24 9.31-9.28 9.31Zm5.1-7.17c-.28-.14-1.66-.82-1.91-.92-.25-.09-.43-.14-.61.14-.18.28-.7.92-.85 1.11-.16.19-.31.21-.59.07-.28-.14-1.2-.44-2.29-1.41-.85-.76-1.42-1.7-1.58-1.98-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.18-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.61-1.47-.84-2-.22-.53-.44-.46-.61-.46-.16 0-.35-.02-.54-.02-.19 0-.49.07-.74.35s-.97.95-.97 2.3c0 1.35.99 2.65 1.13 2.83.14.19 1.95 2.98 4.73 4.19.66.29 1.17.46 1.57.59.66.21 1.27.18 1.75.11.53-.08 1.66-.68 1.89-1.33.23-.65.23-1.2.16-1.33-.07-.14-.25-.22-.53-.36Z"/>
                </svg>
                WhatsApp Nu
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


