import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { visual } from '../../engine/timeEngine.ts'
import { lerp, smoothstep } from '../../utils/colors.ts'
import { FutureCity } from './FutureCity.tsx'
import { IndustrialScene } from './IndustrialScene.tsx'
import { Particles } from './Particles.tsx'
import { SolarSystem } from './SolarSystem.tsx'

function CameraRig({ mobile }: { mobile: boolean }) {
  const look = useMemo(() => new THREE.Vector3(0, 0.3, 0), [])
  const dest = useMemo(() => new THREE.Vector3(), [])
  const fog = useRef<THREE.Color>(new THREE.Color('#07080c'))

  useFrame((state, delta) => {
    const y = visual.year
    let x = 0
    let cy = mobile ? 1.8 : 1.4
    let z = mobile ? 9.2 : 7.2
    let ly = 0.28

    if (y > 2032) {
      const a = smoothstep(2032, 2050, y)
      cy = lerp(cy, 11, a)
      z = lerp(z, 15, a)
    }
    if (y > 2050) {
      const a = smoothstep(2050, 2100, y)
      x = lerp(0, 3.1, a)
      cy = lerp(11, 2.35, a)
      z = lerp(15, 5.4, a)
    }
    if (y > 2100) {
      const a = smoothstep(2100, 2200, y)
      x = lerp(3.1, 0.2, a)
      cy = lerp(2.35, 20, a)
      z = lerp(5.4, 3.2, a)
    }
    if (y > 2068) {
      const a = smoothstep(2068, 2140, y)
      x = lerp(x, 0, a)
      cy = lerp(cy, 6.5, a)
      z = lerp(z, mobile ? 22 : 26, a)
      ly = lerp(ly, 0, a)
    }

    dest.set(x, cy, z)
    look.set(0, ly, 0)
    const k = 1 - Math.exp(-delta * 2.2)
    state.camera.position.lerp(dest, k)
    state.camera.lookAt(look)
    fog.current.set(visual.theme.background)
    if (state.scene.fog instanceof THREE.Fog) {
      state.scene.fog.color.copy(fog.current)
    }
    state.gl.setClearColor(fog.current, 0)
  })

  return null
}

export function Scene({ mobile, reduced }: { mobile: boolean; reduced: boolean }) {
  return (
    <div className="canvas-wrap">
      <Canvas
        dpr={mobile ? 1 : [1, 1.45]}
        camera={{ position: [0, 1.4, 7.2], fov: 42, near: 0.1, far: 80 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : 'always'}
        style={{ pointerEvents: 'none' }}
      >
        <fog attach="fog" args={['#07080c', 8, 32]} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[6, 8, 4]} intensity={1.1} />
        <Suspense fallback={null}>
          <CameraRig mobile={mobile} />
          <Particles count={mobile ? 180 : 460} />
          {!mobile ? <IndustrialScene /> : null}
          <FutureCity density={mobile ? 8 : 12} />
          <SolarSystem />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
