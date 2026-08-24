import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const revealVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Reveal({ children, className = "" }) {
  const shouldReduce = useReducedMotion();
  
  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealVariant}
    >
      {children}
    </motion.div>
  );
}
