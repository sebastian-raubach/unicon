import { TimeUnit } from '../TimeUnit'

export class Minute extends TimeUnit {
  constructor() {
    super('unitTimeMinute', 'min', ['min', 'minute', 'minutes', 'minuten'])
  }

  toSiUnit(value: number): number {
    return value * 60
  }
  fromSiUnit(value: number): number {
    return value / 60
  }
}