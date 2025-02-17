export function hex(data: Uint8Array) {
  return Array.from(data)
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}
