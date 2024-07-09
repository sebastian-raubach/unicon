import { ConversionResult } from '../ConversionResult'
import { SiUnit } from '../SiUnit'
import { TimeUnit } from '../TimeUnit'

export class Second extends TimeUnit implements SiUnit {
  constructor() {
    super('unitTimeSecond', 's', ['s', 'second', 'seconds', 'sekunde', 'sekunden'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}