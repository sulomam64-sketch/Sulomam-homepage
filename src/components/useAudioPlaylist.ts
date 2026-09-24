import { useCallback, useEffect, useRef, useState } from 'react'
import type { PlaylistTrack } from '../content/playlist'
import { createPlayRecorder, trackIdFromAudioSrc, type PlayEventName } from './playCounter'

const recordTrackEvent = createPlayRecorder((body) => {
  try {
    void fetch('/api/play', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'omit',
      cache: 'no-store',
    }).catch(() => {})
  } catch {
    // Counting is fire-and-forget and must not affect playback.
  }
})

export function formatTimecode(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }
  const whole = Math.floor(seconds)
  const mins = Math.floor(whole / 60)
  const secs = whole % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function useAudioPlaylist(tracks: PlaylistTrack[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const wantPlayingRef = useRef(false)
  const seekingRef = useRef(false)

  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)

  const safeIndex = tracks.length === 0 ? 0 : Math.min(index, tracks.length - 1)
  const track = tracks[safeIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  const play = useCallback(() => {
    wantPlayingRef.current = true
    setIsPlaying(true)
    void audioRef.current?.play().catch(() => {
      wantPlayingRef.current = false
      setIsPlaying(false)
    })
  }, [])

  const pause = useCallback(() => {
    wantPlayingRef.current = false
    setIsPlaying(false)
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (wantPlayingRef.current) {
      pause()
    } else {
      play()
    }
  }, [pause, play])

  const goToTrack = useCallback((nextIndex: number, shouldPlay: boolean) => {
    wantPlayingRef.current = shouldPlay
    setIsPlaying(shouldPlay)
    setCurrentTime(0)
    setDuration(0)
    setIndex(nextIndex)
  }, [])

  const selectTrack = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= tracks.length) return
      if (nextIndex === safeIndex) {
        toggle()
        return
      }
      goToTrack(nextIndex, true)
    },
    [goToTrack, safeIndex, toggle, tracks.length],
  )

  const next = useCallback(() => {
    if (tracks.length === 0) return
    goToTrack((safeIndex + 1) % tracks.length, true)
  }, [goToTrack, safeIndex, tracks.length])

  const previous = useCallback(() => {
    if (tracks.length === 0) return
    const audio = audioRef.current
    if (audio && audio.currentTime > 2) {
      audio.currentTime = 0
      setCurrentTime(0)
      return
    }
    goToTrack(safeIndex <= 0 ? tracks.length - 1 : safeIndex - 1, true)
  }, [goToTrack, safeIndex, tracks.length])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return
    const nextTime = Number.isFinite(time) ? Math.max(0, time) : 0
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }, [])

  const beginSeek = useCallback(() => {
    seekingRef.current = true
  }, [])

  const endSeek = useCallback(
    (time: number) => {
      seekingRef.current = false
      seek(time)
    },
    [seek],
  )

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.min(1, Math.max(0, nextVolume))
    setVolumeState(clamped)
    if (clamped > 0) {
      setMuted(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((current) => !current)
  }, [])

  const onTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio || seekingRef.current) return
    setCurrentTime(audio.currentTime)
  }, [])

  const onLoadedMetadata = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
  }, [])

  const notePlayback = useCallback(
    (event: PlayEventName) => {
      try {
        const audio = audioRef.current
        const fromSrc = trackIdFromAudioSrc(audio?.currentSrc || audio?.src || '', tracks)
        const id = fromSrc ?? track?.id
        if (id) recordTrackEvent(id, event)
      } catch {
        // Counting must not affect playback.
      }
    },
    [track, tracks],
  )

  const onEnded = useCallback(() => {
    notePlayback('complete')
    if (tracks.length === 0) return
    if (safeIndex >= tracks.length - 1) {
      wantPlayingRef.current = false
      setIsPlaying(false)
      setCurrentTime(0)
      return
    }
    goToTrack(safeIndex + 1, true)
  }, [goToTrack, notePlayback, safeIndex, tracks.length])

  const onCanPlay = useCallback(() => {
    if (!wantPlayingRef.current) return
    void audioRef.current?.play().catch(() => {
      wantPlayingRef.current = false
      setIsPlaying(false)
    })
  }, [])

  const onPlay = useCallback(() => {
    wantPlayingRef.current = true
    setIsPlaying(true)
    notePlayback('play')
  }, [notePlayback])

  const onPause = useCallback(() => {
    const audio = audioRef.current
    if (audio && !audio.ended && wantPlayingRef.current === false) {
      setIsPlaying(false)
    }
  }, [])

  return {
    audioRef,
    track,
    index: safeIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    muted,
    toggle,
    selectTrack,
    next,
    previous,
    seek,
    beginSeek,
    endSeek,
    setVolume,
    toggleMute,
    onTimeUpdate,
    onLoadedMetadata,
    onEnded,
    onCanPlay,
    onPlay,
    onPause,
  }
}
