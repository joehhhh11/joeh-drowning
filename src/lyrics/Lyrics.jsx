import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { songs } from "./songs";

export default function Lyrics({ onLyricChange , readyToPlay}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [currentSong] = useState(songs[0]);
  const audioRef = useRef(null);

useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !readyToPlay) return;

    // Log para saber si intentó reproducir y qué URL tiene
    console.log("Intentando reproducir:", audio.src);

    audio.play()
      .then(() => {
        console.log("Reproducción exitosa ✅");
      })
      .catch((error) => {
        // ESTE ES EL LOG DETALLADO
        console.error("Error al reproducir audio:");
        console.error("Nombre del error:", error.name);
        console.error("Mensaje:", error.message);

        if (error.name === "NotAllowedError") {
          console.warn("⚠️ BLOQUEO DE AUTOPLAY: El usuario debe hacer clic en la página antes de que el audio pueda sonar.");
        } else if (error.name === "NotSupportedError") {
          console.warn("⚠️ FORMATO NO SOPORTADO: El navegador no puede reproducir este tipo de archivo.");
        }
      });

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [readyToPlay]);

  // 2. Lógica para detectar qué letra toca
  useEffect(() => {
    let newIndex = -1;
    for (let i = currentSong.lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= currentSong.lyrics[i].time) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentLyricIndex) {
      setCurrentLyricIndex(newIndex);
      const textToSend = newIndex >= 0 ? currentSong.lyrics[newIndex].text : "";
      if (onLyricChange) onLyricChange(textToSend);
    }
  }, [currentTime, currentSong.lyrics, currentLyricIndex, onLyricChange]);

  const currentLyric = currentLyricIndex >= 0 ? currentSong.lyrics[currentLyricIndex] : null;

  return (
    <>
      <audio ref={audioRef} src={currentSong.url} loop />
      
      {/* Contenedor fijo por encima del Canvas */}
      <div style={{
          position: 'fixed',
          bottom: '0%', // Ajusta la altura a tu gusto
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999, // Super importante para que no lo tape el Canvas
          width: '90%',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
        
        <AnimatePresence mode="wait">
          {currentLyric && (
            <div
              key={currentLyricIndex}
              // Animación de entrada/salida suave de toda la frase (sin letra por letra)
              style={{
                color: 'white',
                fontSize: '10rem',
                fontWeight: '900',
                textTransform: 'uppercase',
                fontFamily: "'subtitule', sans-serif",
                WebkitTextStroke: '1px black',
textShadow: '0px 10px 20px rgba(0,0,0,0.5)',              }}
            >
              {currentLyric.text}
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}