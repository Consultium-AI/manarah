import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
// import CTA from './components/CTA';
import Footer from './components/Footer';
import Donate from './components/Donate';
// import FloatingDonate from './components/FloatingDonate';
import Newsletter from './components/Newsletter';
import Contact from './components/Contact';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('manarahPopupShown');
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem('manarahPopupShown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      <Header />

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-11/12 max-w-md rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">⚠️ Let op!</h3>
                <button
                  aria-label="Sluit pop-up"
                  onClick={() => setShowPopup(false)}
                  className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="text-gray-700">
                We zijn nog volop bezig met het opbouwen van Stichting Manarah. Sommige pagina’s of
                functies werken mogelijk nog niet naar behoren. Bedankt voor je begrip!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main">
        <Hero />
        <About />
        <Donate />
        <Contact />
        <Newsletter />
      </main>

      <Footer />
      {/* <FloatingDonate /> */}
    </div>
  );
}

export default App;


