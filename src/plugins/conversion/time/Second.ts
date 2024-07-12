import { ConversionResult } from '../ConversionResult'
import { TimeUnit } from '../TimeUnit'

export class Second extends TimeUnit {
  constructor() {
    super('unitTimeSecond', 's', ['s', 'second', 'seconds', 'sekunde', 'sekunden'], true)
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}