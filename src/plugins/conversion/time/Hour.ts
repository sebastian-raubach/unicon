import { TimeUnit } from '../TimeUnit'

export class Hour extends TimeUnit {
  constructor() {
    super('unitTimeHour', 'h', ['h', 'hour', 'hours', 'stunde', 'stunden'])
  }

  toSiUnit(value: number): number {
    return value * 60 * 60
  }
  fromSiUnit(value: number): number {
    return value / (60 * 60)
  }
}