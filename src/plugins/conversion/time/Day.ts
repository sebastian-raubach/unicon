import { TimeUnit } from '../TimeUnit'

export class Day extends TimeUnit {
  constructor() {
    super('unitTimeDay', 'd', ['d', 'day', 'days', 'tag', 'tage'])
  }

  toSiUnit(value: number): number {
    return value * 60 * 60 * 24
  }
  fromSiUnit(value: number): number {
    return value / (60 * 60 * 24)
  }
}