import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraAnimation({ ready }) {
  const { camera } = useThree();
  const time = useRef(0);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    if (!ready) return;
    time.current += delta;

    const phaseDurations = [4.5, 1.5, 1.5, 2, 2, 2]; 
    
    let currentPhase = 0;
    let accumulatedTime = 0;
    const loopTime = time.current % 13;
    
    for (let i = 0; i < phaseDurations.length; i++) {
      if (loopTime < accumulatedTime + phaseDurations[i]) {
        currentPhase = i;
        break;
      }
      accumulatedTime += phaseDurations[i];
    }

    const localTime = time.current * 0.3;

    switch (currentPhase) {
      case 0:
        camera.position.x = Math.sin(localTime) * 2;
        camera.position.y = 2;
        camera.position.z = 6 + Math.cos(localTime) * 0.5;
        targetPosition.current.set(0, 0, 0);
        break;

      case 1: 
        camera.position.set(
          -2.5 + Math.sin(localTime) * -1.3,
          1.5 + Math.cos(localTime) * 0.2,
          3
        );
        targetPosition.current.set(-2, 0, 0.5);
        break;

      case 2: 
        camera.position.set(
          Math.sin(localTime) * 0.5,
          1.5,
          -3.6 + Math.cos(localTime) * 0.3
        );
        targetPosition.current.set(0, 0.5, -2.5);
        break;

      case 3:
        camera.position.set(
          4 + Math.sin(localTime) * 2,
          0.5,
          -4 + Math.cos(localTime) * 0.2
        );
        targetPosition.current.set(1, 0, 1.5);
        break;

      case 4:
        camera.position.set(
          3.1 + Math.cos(localTime) * 0.3,
          0.9,
          -1.1 + Math.sin(localTime) * 0.2
        );
        targetPosition.current.set(3, 0.5, 1);
        break;

      case 5:
        camera.position.set(6, 1.5, Math.sin(localTime) * 2);
        targetPosition.current.set(0, 0, 0);
        break;
    }

    camera.lookAt(targetPosition.current);
  });

  return null;
}