import { useId, useState, type CSSProperties } from 'react'
import type { PlaylistTrack } from '../content/playlist'
import { formatTimecode, useAudioPlaylist } from './useAudioPlaylist'
import './AudioPlaylistPlayer.css'

export type AudioPlayerLabels = {
  play: string
  pause: string
  previous: string
  next: string
  seek: string
  volume: string
  mute: string
  unmute: string
  trackList: string
  hideTrackList: string
  showTrackList: string
  nowPlaying: string
}

type Props = {
  tracks: PlaylistTrack[]
  labels: AudioPlayerLabels
}

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  )
}

function IconPrev() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6h2.2v12H6zM18 6.5v11l-9.5-5.5L18 6.5z" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.8 6H18v12h-2.2zM6 6.5l9.5 5.5L6 17.5v-11z" />
    </svg>
  )
}

function IconVolume({ muted }: { muted: boolean }) {
  if (muted) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4V9zm11.6 1.1 1.4 1.4 1.4-1.4 1.1 1.1-1.4 1.4 1.4 1.4-1.1 1.1-1.4-1.4-1.4 1.4-1.1-1.1 1.4-1.4-1.4-1.4 1.1-1.1z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h4l5-4v14l-5-4H4V9zm12.2 1.1a4 4 0 0 1 0 3.8l-1.2-.7a2.6 2.6 0 0 0 0-2.4l1.2-.7zm1.7-2.4a7 7 0 0 1 0 8.6l-1.1-.8a5.6 5.6 0 0 0 0-7l1.1-.8z" />
    </svg>
  )
}

export function AudioPlaylistPlayer({ tracks, labels }: Props) {
  const listId = useId()
  const [listOpen, setListOpen] = useState(true)
  const {
    audioRef,
    track,
    index,
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
  } = useAudioPlaylist(tracks)

  if (!track) {
    return null
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const volumePercent = muted ? 0 : volume * 100

  return (
    <div className="audio-player" role="region" aria-label={labels.trackList}>
      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        playsInline
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
        onCanPlay={onCanPlay}
        onPlay={onPlay}
        onPause={onPause}
      />

      <div className="audio-player-main">
        <div className="audio-player-cover" aria-hidden="true">
          {track.cover ? (
            <img src={track.cover} alt="" />
          ) : (
            <span className="audio-player-monogram">
              {track.artist.slice(0, 1).toUpperCase()}
            </span>
          )}
        </div>

        <div className="audio-player-now">
          <p className="audio-player-kicker">{labels.nowPlaying}</p>
          <p className="audio-player-title" aria-live="polite">
            {track.title}
          </p>
          <p className="audio-player-artist">{track.artist}</p>
        </div>

        <div className="audio-player-transport">
          <button
            type="button"
            className="audio-player-icon-btn"
            onClick={previous}
            aria-label={labels.previous}
          >
            <IconPrev />
          </button>
          <button
            type="button"
            className="audio-player-play"
            onClick={toggle}
            aria-label={isPlaying ? labels.pause : labels.play}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
          </button>
          <button
            type="button"
            className="audio-player-icon-btn"
            onClick={next}
            aria-label={labels.next}
          >
            <IconNext />
          </button>
        </div>

        <div className="audio-player-progress-row">
          <span className="audio-player-time">{formatTimecode(currentTime)}</span>
          <label className="audio-player-slider-wrap">
            <span className="visually-hidden">{labels.seek}</span>
            <input
              className="audio-player-range"
              type="range"
              min={0}
              max={duration || 0}
              step={0.01}
              value={duration > 0 ? currentTime : 0}
              disabled={duration <= 0}
              aria-valuetext={`${formatTimecode(currentTime)} / ${formatTimecode(duration)}`}
              onPointerDown={beginSeek}
              onChange={(event) => seek(Number(event.target.value))}
              onPointerUp={(event) => endSeek(Number(event.currentTarget.value))}
              style={{ '--progress': `${progress}%` } as CSSProperties}
            />
          </label>
          <span className="audio-player-time">{formatTimecode(duration)}</span>
        </div>

        <div className="audio-player-volume">
          <button
            type="button"
            className="audio-player-icon-btn audio-player-mute"
            onClick={toggleMute}
            aria-label={muted || volume === 0 ? labels.unmute : labels.mute}
          >
            <IconVolume muted={muted || volume === 0} />
          </button>
          <label className="audio-player-slider-wrap audio-player-volume-slider">
            <span className="visually-hidden">{labels.volume}</span>
            <input
              className="audio-player-range"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              aria-valuetext={`${Math.round(volumePercent)}%`}
              onChange={(event) => setVolume(Number(event.target.value))}
              style={{ '--progress': `${volumePercent}%` } as CSSProperties}
            />
          </label>
        </div>
      </div>

      <div className="audio-player-list-head">
        <h3 className="audio-player-list-title" id={listId}>
          {labels.trackList}
        </h3>
        <button
          type="button"
          className="audio-player-list-toggle"
          onClick={() => setListOpen((open) => !open)}
          aria-expanded={listOpen}
          aria-controls={`${listId}-panel`}
        >
          {listOpen ? labels.hideTrackList : labels.showTrackList}
        </button>
      </div>

      {listOpen ? (
        <ol className="audio-player-list" id={`${listId}-panel`} aria-labelledby={listId}>
          {tracks.map((item, itemIndex) => {
            const active = itemIndex === index
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={active ? 'audio-player-track is-active' : 'audio-player-track'}
                  onClick={() => selectTrack(itemIndex)}
                  aria-current={active ? 'true' : undefined}
                  aria-label={`${itemIndex + 1}. ${item.title} — ${item.artist}`}
                >
                  <span className="audio-player-track-num">
                    {String(itemIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="audio-player-track-meta">
                    <span className="audio-player-track-title">{item.title}</span>
                    <span className="audio-player-track-artist">{item.artist}</span>
                  </span>
                  {active ? (
                    <span className="audio-player-track-state" aria-hidden="true">
                      {isPlaying ? <IconPause /> : <IconPlay />}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ol>
      ) : null}
    </div>
  )
}
