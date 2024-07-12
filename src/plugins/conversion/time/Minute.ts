import { ConversionResult } from '../ConversionResult'
import { TimeUnit } from '../TimeUnit'
import { Second } from './Second'

export class Minute extends TimeUnit {
  constructor() {
    super('unitTimeMinute', 'min', ['min', 'minute', 'minutes', 'minuten'], false, new Second())
  }

  toSiUnit(value: number): number {
    return value * 60
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 60)
  }
}