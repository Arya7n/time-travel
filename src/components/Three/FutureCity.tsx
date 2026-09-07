import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { visual } from '../../engine/timeEngine.ts'
import { clamp } from '../../utils/colors.ts'

export function FutureCity({ density = 12 }: { density?: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const count = density * density
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8aa7ff',
        metalness: 0.55,
        roughness: 0.38,
        emissive: '#14203a',
        emissiveIntensity: 0.35,
      }),
    [],
  )

  useLayoutEffect(() => {
    const inst = mesh.current
    if (!inst) return
    let i = 0
    for (let x = 0; x < density; x += 1) {
      for (let z = 0; z < density; z += 1) {
        const h = 0.35 + Math.abs(Math.sin(x * 1.7 + z * 0.9) * Math.cos(z * 1.3)) * 5.2
        dummy.position.set((x - density / 2) * 1.15, h / 2 - 1.6, (z - density / 2) * 1.15 - 2)
        dummy.scale.set(0.72, h, 0.72)
        dummy.updateMatrix()
        inst.setMatrixAt(i, dummy.matrix)
        i += 1
      }
    }
    inst.instanceMatrix.needsUpdate = true
  }, [density, dummy])

  useFrame(() => {
    const inst = mesh.current
    if (!inst) return
    const show = visual.year > 2032
    inst.visible = show
    material.color.set(visual.theme.accent)
    material.opacity = clamp((visual.year - 2032) / 18)
    material.transparent = true
  })

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.62, -2]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#070b14" metalness={0.4} roughness={0.8} />
      </mesh>
      <instancedMesh ref={mesh} args={[geometry, material, count]} />
    </group>
  )
}
