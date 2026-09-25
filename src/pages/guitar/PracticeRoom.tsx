import { useEffect, useRef, useState } from 'react'
import { homePlaylist } from '../../content/playlist'

function displayTitle(title: string) {
  return title.replaceAll('_', ' ')
}

/**
 * Background music for the guitar room.
 * Uses the Demo Songs files, but not `useAudioPlaylist`, so nothing here
 * is reported to the homepage play counter. Audio never starts by itself.
 */
export function PracticeRoom() {
  const tracks = homePlaylist
  const audioRef = useRef<HTMLAudioElement>(null)
  const wantPlayRef = useRef(false)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loop, setLoop] = useState(true)
  const [volume, setVolume] = useState(0.7)

  const track = tracks[index]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume, index])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !wantPlayRef.current) return
    const start = () => {
      void audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        wantPlayRef.current = false
        setPlaying(false)
      })
    }
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) start()
    else audio.addEventListener('canplay', start, { once: true })
    return () => audio.removeEventListener('canplay', start)
  }, [index])

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      audio?.pause()
    }
  }, [])

  if (!track) return null

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (wantPlayRef.current) {
      wantPlayRef.current = false
      audio.pause()
      setPlaying(false)
      return
    }
    wantPlayRef.current = true
    void audio.play().then(
      () => setPlaying(true),
      () => {
        wantPlayRef.current = false
        setPlaying(false)
      },
    )
  }

  function choose(nextIndex: number) {
    if (nextIndex === index) {
      togglePlay()
      return
    }
    setIndex(nextIndex)
  }

  return (
    <div className="toy">
      <h3 className="toy-title">Practice room</h3>
      <p className="toy-lead">Studio demos, if you want something on. It stays quiet until you press play.</p>

      <audio
        ref={audioRef}
        src={track.src}
        preload="none"
        playsInline
        loop={loop}
        onPlay={() => {
          wantPlayRef.current = true
          setPlaying(true)
        }}
        onPause={() => {
          if (!wantPlayRef.current) setPlaying(false)
        }}
        onEnded={() => {
          if (!loop) {
            wantPlayRef.current = false
            setPlaying(false)
          }
        }}
      />

      <div className="room-now">
        <button type="button" className="room-play" onClick={togglePlay} aria-pressed={playing}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <p className="room-title">{displayTitle(track.title)}</p>
      </div>

      <div className="room-tools">
        <button
          type="button"
          className={loop ? 'room-loop is-on' : 'room-loop'}
          aria-pressed={loop}
          onClick={() => setLoop((current) => !current)}
        >
          Loop
        </button>
        <label className="room-volume">
          <span className="guitar-sr">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            aria-valuetext={`${Math.round(volume * 100)} percent`}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      </div>

      <ol className="room-list">
        {tracks.map((item, itemIndex) => {
          const current = itemIndex === index
          return (
            <li key={item.id}>
              <button
                type="button"
                className={current ? 'room-track is-current' : 'room-track'}
                aria-current={current ? 'true' : undefined}
                onClick={() => choose(itemIndex)}
              >
                <span className="room-num">{String(itemIndex + 1).padStart(2, '0')}</span>
                <span>{displayTitle(item.title)}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
