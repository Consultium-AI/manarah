import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-transparent shadow-none absolute inset-x-0 top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container-max px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between"
      >
        {/* Left: brand */}
        <a href="/" className="flex items-center gap-2 -ml-1 sm:-ml-8">
          <motion.img
            src="assets/logo.jpeg"
            alt="Logo Stichting Manarah"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="h-18 sm:h-32 w-auto -mb-4 sm:-mb-14 drop-shadow-md"
          />
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden text-2xl text-white p-2 rounded-md bg-black/20"
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Right: nav links */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="hidden sm:flex items-center gap-10 text-base font-medium text-white"
        >
          <a href="#main" className="hover:text-blue-200">Home</a>
          <a href="#about" className="hover:text-blue-200">Over ons</a>
          <a href="#projects" className="hover:text-blue-200">Projecten</a>
          <a href="#donate" className="hover:text-blue-200">Doneer</a>
          <a href="#contact" className="hover:text-blue-200">Contact</a>
          <a href="https://stichtingmanarah.nl/admin" className="hover:text-blue-200">Admin Dashboard</a>
        </motion.nav>
      </motion.div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t bg-neutral-900/90 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70">
          <div className="container-max px-3 py-4 grid gap-3 text-white text-lg">
            <a href="#main" onClick={() => setOpen(false)}>Home</a>
            <a href="#about" onClick={() => setOpen(false)}>Over ons</a>
            <a href="#projects" onClick={() => setOpen(false)}>Projecten</a>
            <a href="#donate" onClick={() => setOpen(false)}>Doneer</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
            <a href="https://stichtingmanarah.nl/admin">Admin Dashboard</a>
          </div>
        </div>
      )}
    </header>
  );
}


