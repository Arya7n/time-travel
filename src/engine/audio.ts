import { eraAtYear } from '../data/eras.ts'

type Nodes = {
  ctx: AudioContext
  master: GainNode
  filter: BiquadFilterNode
  osc: OscillatorNode
  lfo: OscillatorNode
  lfoGain: GainNode
  noise: AudioBufferSourceNode
  noiseGain: GainNode
}

let nodes: Nodes | null = null

function noiseBuffer(ctx: AudioContext) {
  const length = ctx.sampleRate * 3
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

async function ensureGraph(): Promise<Nodes | null> {
  if (typeof window === 'undefined') return null
  if (nodes) {
    if (nodes.ctx.state === 'suspended') await nodes.ctx.resume()
    return nodes
  }
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 400
  filter.connect(master)

  const noiseGain = ctx.createGain()
  noiseGain.gain.value = 0.12
  noiseGain.connect(filter)

  const noise = ctx.createBufferSource()
  noise.buffer = noiseBuffer(ctx)
  noise.loop = true
  noise.connect(noiseGain)
  noise.start()

  const osc = ctx.createOscillator()
  osc.type = 'sine'
  osc.frequency.value = 110
  const oscGain = ctx.createGain()
  oscGain.gain.value = 0.03
  osc.connect(oscGain)
  oscGain.connect(filter)
  osc.start()

  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.value = 0.07
  const lfoGain = ctx.createGain()
  lfoGain.gain.value = 40
  lfo.connect(lfoGain)
  lfoGain.connect(filter.frequency)
  lfo.start()

  nodes = { ctx, master, filter, osc, lfo, lfoGain, noise, noiseGain }
  return nodes
}

export async function unlockAudio() {
  await ensureGraph()
}

export function setMuted(muted: boolean) {
  if (!nodes) return
  const now = nodes.ctx.currentTime
  nodes.master.gain.cancelScheduledValues(now)
  nodes.master.gain.linearRampToValueAtTime(muted ? 0 : 0.22, now + 0.4)
}

export function morphAudio(year: number, muted = false) {
  if (!nodes || muted) return
  const era = eraAtYear(year).id
  const now = nodes.ctx.currentTime
  const map: Record<string, { freq: number; osc: number; type: OscillatorType; noise: number }> =
    {
      ancient: { freq: 280, osc: 90, type: 'sine', noise: 0.16 },
      medieval: { freq: 340, osc: 130, type: 'triangle', noise: 0.12 },
      industrial: { freq: 900, osc: 55, type: 'sawtooth', noise: 0.22 },
      artdeco: { freq: 720, osc: 220, type: 'triangle', noise: 0.1 },
      midcentury: { freq: 640, osc: 180, type: 'sine', noise: 0.11 },
      digital: { freq: 1400, osc: 330, type: 'square', noise: 0.08 },
      present: { freq: 520, osc: 96, type: 'sine', noise: 0.09 },
      future: { freq: 1600, osc: 48, type: 'sine', noise: 0.14 },
    }
  const patch = map[era] ?? map.present
  nodes.filter.frequency.linearRampToValueAtTime(patch.freq, now + 0.6)
  nodes.osc.frequency.linearRampToValueAtTime(patch.osc, now + 0.6)
  nodes.osc.type = patch.type
  nodes.noiseGain.gain.linearRampToValueAtTime(patch.noise, now + 0.6)
}
