import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { visual } from '../../engine/timeEngine.ts'

export function IndustrialScene() {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    const show = visual.year > 1480 && visual.year < 1935
    const speed = visual.theme.animationSpeed
    if (a.current) {
      a.current.visible = show
      a.current.rotation.z += delta * 0.45 * speed
    }
    if (b.current) {
      b.current.visible = show
      b.current.rotation.z -= delta * 0.7 * speed
    }
  })

  return (
    <group position={[3.8, 0.4, -1.6]}>
      <mesh ref={a}>
        <torusGeometry args={[1.15, 0.16, 10, 28]} />
        <meshStandardMaterial color="#7fb4d2" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh ref={b} position={[1.55, -0.55, 0.2]}>
        <torusGeometry args={[0.72, 0.12, 8, 22]} />
        <meshStandardMaterial color="#9ec4d8" metalness={0.78} roughness={0.32} />
      </mesh>
    </group>
  )
}
