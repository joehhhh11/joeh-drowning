import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import Modelo from './Modelo'
import Modelo2 from './Modelo2'
import Modelo3 from './Modelo3'
import CameraAnimation from './components/CameraAnimation'
import Lyrics from './lyrics/Lyrics'
import Escenario from './Escenario'

function App() {
  const [currentText, setCurrentText] = useState("")
  const [modelsLoaded, setModelsLoaded] = useState(false); // Los modelos terminaron de cargar
  const [userStarted, setUserStarted] = useState(false);   // El usuario hizo clic en START

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        background: 'linear-gradient(90deg, #000000, #030032)',
        overflow: 'hidden'
      }}
    >
      {/* 1. TÍTULO PORSCHE */}
      <div style={{
          position: 'absolute',
          top: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Porsche',
          fontSize: '42px',
          letterSpacing: '4px',
          color: 'white',
          zIndex: 10,
          opacity: 0.9,
          pointerEvents: 'none'
        }}>
        PORSCHE
      </div>

      {/* 2. OVERLAY DE INICIO (Soluciona el bloqueo de audio) */}
      {modelsLoaded && !userStarted && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}>
          <button 
            onClick={() => setUserStarted(true)}
            style={{
              padding: '15px 40px',
              fontSize: '20px',
              fontFamily: 'Porsche',
              backgroundColor: 'white',
              color: 'black',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '2px',
              borderRadius: '2px',
              transition: '0.3s'
            }}
          >
            ENTER EXPERIENCE
          </button>
          <p style={{ color: 'white', marginTop: '15px', fontSize: '12px', opacity: 0.6 }}>
            Click to enable audio
          </p>
        </div>
      )}

      {/* 3. LETRAS (Ahora dependen de userStarted) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' 
      }}>
        <Lyrics onLyricChange={setCurrentText} readyToPlay={userStarted}/>
      </div>

      <Canvas
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        camera={{ position: [0, 2, 6], fov: 50 }}
        shadows
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.7,
          // Corregido para evitar el error de los logs anteriores:
          outputColorSpace: THREE.SRGBColorSpace 
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={0.5} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <hemisphereLight intensity={0.4} groundColor="#444444" />
        
        <Environment files="/studio.hdr" />

        <Suspense fallback={null}>
          <Escenario />
          <Modelo position={[-2.2, 0, 0]} rotation={[0, Math.PI / 5, 0]} />
          <Modelo2 position={[0.2, 0, -1.1]} rotation={[0, Math.PI / 15, 0]} />
          <Modelo3 position={[2.7, 0, -0.9]} rotation={[0, -Math.PI / 15, 0]} />
          
          {/* Tracker: Solo avisa que los modelos cargaron */}
          <primitive object={new THREE.Group()} onUpdate={() => {
             if(!modelsLoaded) setModelsLoaded(true);
          }} />
        </Suspense>

        <CameraAnimation ready={userStarted}/>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}

export default App;