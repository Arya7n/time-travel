import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { visual } from '../../engine/timeEngine.ts'

export function Particles({ count = 420 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 36
      data[i * 3 + 1] = (Math.random() - 0.5) * 20
      data[i * 3 + 2] = (Math.random() - 0.5) * 36
    }
    return data
  }, [count])

  useFrame((_, delta) => {
    const mesh = points.current
    if (!mesh) return
    mesh.rotation.y += delta * 0.03 * visual.theme.animationSpeed
    const material = mesh.material
    if (material instanceof THREE.PointsMaterial) {
      material.opacity = 0.12 + visual.theme.particleDensity * 0.5
      material.color.set(visual.theme.accent)
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} transparent depthWrite={false} color="#ffffff" />
    </points>
  )
}
