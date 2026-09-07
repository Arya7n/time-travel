import { useMemo, useRef } from 'react'
import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { patchEngine, visual } from '../../engine/timeEngine.ts'
import { clamp } from '../../utils/colors.ts'

function Orbit({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 72; i += 1) {
      const a = (i / 72) * Math.PI * 2
      pts.push([Math.cos(a) * radius, 0, Math.sin(a) * radius])
    }
    return pts
  }, [radius])
  return <Line points={points} color="#9bb8ff" lineWidth={1} transparent opacity={0.38} />
}

export function SolarSystem() {
  const group = useRef<THREE.Group>(null)
  const earth = useRef<THREE.Mesh>(null)
  const moon = useRef<THREE.Mesh>(null)
  const mars = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const show = visual.year > 2066
    if (group.current) {
      group.current.visible = show
      group.current.scale.setScalar(clamp((visual.year - 2066) / 20))
    }
    if (earth.current) {
      earth.current.position.set(Math.cos(t * 0.22) * 4.2, 0, Math.sin(t * 0.22) * 4.2)
    }
    if (moon.current && earth.current) {
      moon.current.position.set(
        earth.current.position.x + Math.cos(t * 0.9) * 0.7,
        0.15,
        earth.current.position.z + Math.sin(t * 0.9) * 0.7,
      )
    }
    if (mars.current) {
      mars.current.position.set(Math.cos(t * 0.14 + 1) * 6.4, 0.1, Math.sin(t * 0.14 + 1) * 6.4)
    }
  })

  return (
    <group ref={group} position={[0, 0.4, -2]}>
      <mesh
        onClick={() => patchEngine({ selectedPlanet: 'sun' })}
      >
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#ffd27a" />
      </mesh>
      <pointLight intensity={2.4} distance={18} color="#ffd27a" />
      <Orbit radius={4.2} />
      <Orbit radius={6.4} />
      <mesh ref={earth} onClick={() => patchEngine({ selectedPlanet: 'earth' })}>
        <sphereGeometry args={[0.28, 18, 18]} />
        <meshStandardMaterial color="#5ea1ff" roughness={0.4} />
      </mesh>
      <mesh ref={moon} onClick={() => patchEngine({ selectedPlanet: 'moon' })}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#d9d4cc" />
      </mesh>
      <mesh ref={mars} onClick={() => patchEngine({ selectedPlanet: 'mars' })}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#d2652d" />
      </mesh>
    </group>
  )
}
