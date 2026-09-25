export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (full, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : full,
  )
}

export function around(template: string, token: string): [string, string] {
  const needle = `{${token}}`
  const index = template.indexOf(needle)
  if (index < 0) return [template, '']
  return [template.slice(0, index), template.slice(index + needle.length)]
}
