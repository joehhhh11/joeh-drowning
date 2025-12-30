import React from "react";
import { motion } from "framer-motion";

export default function TypewriterLine({ text, isActive }) {
  const chars = text.split("");

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: i * 0.03,
            ease: "easeOut",
          }}
          style={{
            color: 'white',
            fontSize: 'min(15vw, 20rem)',
            fontWeight: 'bold',
            textShadow: '0 4px 10px rgba(0,0,0,0.8)',
            display: 'inline-block',
            whiteSpace: 'pre' 
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};