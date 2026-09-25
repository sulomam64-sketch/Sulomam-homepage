import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n'
import { fill } from './fill'

const MIN_BPM = 40
const MAX_BPM = 240

function clampBpm(value: number) {
  return Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)))
}

function createAudioContext(): AudioContext | null {
  const legacy = window as Window & { webkitAudioContext?: typeof AudioContext }
  const Ctor = window.AudioContext ?? legacy.webkitAudioContext
  if (!Ctor) return null
  return new Ctor()
}

export function Metronome() {
  const { t } = useI18n()
  const copy = t.guitar
  const [bpm, setBpm] = useState(76)
  const [running, setRunning] = useState(false)
  const [beat, setBeat] = useState(0)
  const [pulse, setPulse] = useState(0)
  const [tapHint, setTapHint] = useState('')
  const [soundError, setSoundError] = useState(false)

  const bpmRef = useRef(bpm)
  const runningRef = useRef(false)
  const beatRef = useRef(0)
  const nextTimeRef = useRef(0)
  const timerRef = useRef<number | null>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const tapsRef = useRef<number[]>([])
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      runningRef.current = false
      if (timerRef.current != null) window.clearTimeout(timerRef.current)
      void audioRef.current?.close()
    }
  }, [])

  function clickAt(time: number, accent: boolean) {
    const ctx = audioRef.current
    if (!ctx) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(accent ? 920 : 680, time)
    gain.gain.setValueAtTime(0.0001, time)
    gain.gain.exponentialRampToValueAtTime(accent ? 0.16 : 0.07, time + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(time)
    osc.stop(time + 0.06)
  }

  function scheduler() {
    const ctx = audioRef.current
    if (!ctx || !runningRef.current) return
    const horizon = ctx.currentTime + 0.15
    while (nextTimeRef.current < horizon) {
      const scheduledBeat = beatRef.current
      clickAt(nextTimeRef.current, scheduledBeat === 0)
      const delay = Math.max(0, (nextTimeRef.current - ctx.currentTime) * 1000)
      window.setTimeout(() => {
        if (!mountedRef.current || !runningRef.current) return
        setBeat(scheduledBeat)
        setPulse((n) => n + 1)
      }, delay)
      nextTimeRef.current += 60 / bpmRef.current
      beatRef.current = (beatRef.current + 1) % 4
    }
    timerRef.current = window.setTimeout(scheduler, 25)
  }

  async function start() {
    if (runningRef.current) return
    const ctx = audioRef.current ?? createAudioContext()
    audioRef.current = ctx
    if (!ctx) {
      setSoundError(true)
      return
    }
    try {
      if (ctx.state === 'suspended') await ctx.resume()
    } catch {
      setSoundError(true)
      return
    }
    setSoundError(false)
    runningRef.current = true
    beatRef.current = 0
    nextTimeRef.current = ctx.currentTime + 0.05
    setRunning(true)
    setBeat(0)
    scheduler()
  }

  function stop() {
    runningRef.current = false
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setRunning(false)
  }

  function setTempo(next: number) {
    const value = clampBpm(next)
    bpmRef.current = value
    setBpm(value)
  }

  function tap() {
    const now = performance.now()
    const recent = tapsRef.current.filter((stamp) => now - stamp < 2200)
    recent.push(now)
    tapsRef.current = recent.slice(-5)
    setPulse((n) => n + 1)
    if (recent.length < 2) {
      setTapHint(copy.tapHint)
      return
    }
    setTapHint('')
    let total = 0
    for (let i = 1; i < recent.length; i++) total += recent[i] - recent[i - 1]
    setTempo(60000 / (total / (recent.length - 1)))
  }

  return (
    <div className="toy">
      <h3 className="toy-title">{copy.metroTitle}</h3>
      <p className="toy-lead">{copy.metroLead}</p>

      <div className="metro-bpm-row">
        <button type="button" className="metro-step" onClick={() => setTempo(bpm - 1)} aria-label={copy.slower}>
          −
        </button>
        <p className="metro-bpm">
          <span className="metro-bpm-num">{bpm}</span>
          <span className="metro-bpm-unit">{copy.bpmUnit}</span>
        </p>
        <button type="button" className="metro-step" onClick={() => setTempo(bpm + 1)} aria-label={copy.faster}>
          +
        </button>
      </div>

      <label className="metro-slider">
        <span className="guitar-sr">{copy.tempo}</span>
        <input
          type="range"
          min={MIN_BPM}
          max={MAX_BPM}
          value={bpm}
          aria-valuetext={fill(copy.tempoValue, { bpm })}
          onChange={(event) => setTempo(Number(event.target.value))}
        />
      </label>

      <div className={pulse ? 'metro-string is-hit' : 'metro-string'} key={pulse} aria-hidden="true">
        <i />
      </div>
      <div className="metro-beats" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className={running && beat === index ? 'is-current' : undefined} />
        ))}
      </div>

      <div className="metro-actions">
        <button type="button" className="metro-tap" onClick={tap}>
          {copy.tap}
        </button>
        <button
          type="button"
          className="metro-start"
          aria-pressed={running}
          onClick={() => {
            if (running) stop()
            else void start()
          }}
        >
          {running ? copy.stop : copy.start}
        </button>
      </div>
      {tapHint ? (
        <p className="toy-note" role="status">
          {tapHint}
        </p>
      ) : null}
      {soundError ? (
        <p className="toy-note" role="status">
          {copy.soundError}
        </p>
      ) : null}
    </div>
  )
}
