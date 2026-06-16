import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { TimeUnit } from '@/plugins/conversion/TimeUnit'
import { Second } from '@/plugins/conversion/time/Second'

export class Minute extends TimeUnit {
  constructor () {
    super('unitTimeMinute', 'min', ['min', 'minute', 'minutes', 'minuten'], false, new Second())
  }

  toSiUnit (value: number): number {
    return value * 60
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 60)
  }
}
