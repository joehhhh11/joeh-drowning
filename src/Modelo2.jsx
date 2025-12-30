import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export default function Modelo({ url, position, rotation, scale }) {
  const { scene } = useGLTF("/porsche2.glb")

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        obj.material.needsUpdate = true
        
        if (obj.material.map) {
          obj.material.map.encoding = THREE.sRGBEncoding
          obj.material.map.needsUpdate = true
        }
        
        if (obj.material.metalnessMap) {
          obj.material.metalnessMap.needsUpdate = true
        }
        if (obj.material.roughnessMap) {
          obj.material.roughnessMap.needsUpdate = true
        }
        if (obj.material.normalMap) {
          obj.material.normalMap.needsUpdate = true
        }
        
        obj.castShadow = true
        obj.receiveShadow = true
      }
    })
  }, [scene])

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={90}
    />
  )
}
