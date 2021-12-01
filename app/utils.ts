export default {
  clamp(min: number, max: number, value: number):
    number {
    min = Math.min(min, max)
    max = Math.max(min, max)
    return Math.max(Math.min(value, max), min);
  }
}

export type Vector = {
  x: number
  y: number
}
