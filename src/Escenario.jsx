import { useGLTF } from '@react-three/drei'

export default function Escenario() {
  const { scene } = useGLTF("/fondo.glb")
  
  return (
    <primitive 
      object={scene} 
      scale={1}
      position={[-8, 0, 20]} 
    />
  )
}