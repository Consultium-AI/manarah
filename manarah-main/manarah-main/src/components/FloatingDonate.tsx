import { donateLinkProps } from '../constants/donate';

export default function FloatingDonate() {
  return (
    <a
      {...donateLinkProps}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg px-5 py-3 font-bold"
      aria-label="Doneer nu"
    >
      Doneer
    </a>
  );
}


