import type { StatsReport } from './stats.ts'

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function renderStatsPage(report: StatsReport): string {
  const rows = report.tracks
    .map(
      (track) => `<tr>
        <td>${escapeHtml(track.title)}</td>
        <td>${escapeHtml(track.id)}</td>
        <td>${track.plays}</td>
        <td>${track.completions}</td>
      </tr>`,
    )
    .join('')

  const dayKeys = [
    ...new Set(report.tracks.flatMap((track) => Object.keys(track.days))),
  ].sort()

  const dayRows =
    dayKeys.length === 0
      ? '<tr><td colspan="3">No plays yet.</td></tr>'
      : dayKeys
          .map((day) => {
            const cells = report.tracks
              .map((track) => {
                const counts = track.days[day]
                const plays = counts?.plays ?? 0
                const completions = counts?.completions ?? 0
                return `<td>${plays} / ${completions}</td>`
              })
              .join('')
            return `<tr><td>${escapeHtml(day)}</td>${cells}</tr>`
          })
          .join('')

  const dayHeaders = report.tracks
    .map((track) => `<th>${escapeHtml(track.title)}<br>plays / completed</th>`)
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, nofollow">
  <meta name="referrer" content="no-referrer">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Play stats</title>
  <style>
    body { font: 15px/1.45 ui-sans-serif, system-ui, sans-serif; margin: 2rem; color: #1a1a1a; background: #fff; }
    table { border-collapse: collapse; margin: 0 0 1.5rem; }
    th, td { border: 1px solid #ccc; padding: 0.35rem 0.6rem; text-align: left; vertical-align: top; }
    caption { text-align: left; font-weight: 600; margin: 0 0 0.4rem; }
    p { max-width: 40rem; }
  </style>
</head>
<body>
  <h1>Demo song plays</h1>
  <p>Private. Days use ${escapeHtml(report.timezone)}. This page shows the <strong>${escapeHtml(report.context)}</strong> deploy context only.</p>
  <p>Generated ${escapeHtml(report.generatedAt)}. Totals: ${report.totals.plays} plays, ${report.totals.completions} completed.</p>
  <table>
    <caption>Totals</caption>
    <thead><tr><th>Track</th><th>Id</th><th>Plays</th><th>Completed</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <table>
    <caption>Per day (plays / completed)</caption>
    <thead><tr><th>Day</th>${dayHeaders}</tr></thead>
    <tbody>${dayRows}</tbody>
  </table>
</body>
</html>`
}
