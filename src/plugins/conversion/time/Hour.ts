import { ConversionResult } from '../ConversionResult'
import { TimeUnit } from '../TimeUnit'
import { Minute } from './Minute'

export class Hour extends TimeUnit {
  constructor() {
    super('unitTimeHour', 'h', ['h', 'hour', 'hours', 'stunde', 'stunden'], false, new Minute())
  }

  toSiUnit(value: number): number {
    return value * 60 * 60
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / (60 * 60))
  }
}