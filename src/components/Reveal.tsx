import { PropsWithChildren } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'down';
}>;

export default function Reveal({ children, className, delay = 0, direction = 'up' }: RevealProps) {
  const axis = direction === 'left' ? -24 : direction === 'right' ? 24 : 0;
  const y = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y, x: axis }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      viewport={{ once: true, amount: 0.12 }}
      style={{ willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


