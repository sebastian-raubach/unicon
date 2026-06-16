import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { TimeUnit } from '@/plugins/conversion/TimeUnit'
import { Hour } from '@/plugins/conversion/time/Hour'

export class Day extends TimeUnit {
  constructor () {
    super('unitTimeDay', 'd', ['d', 'day', 'days', 'tag', 'tage'], false, new Hour())
  }

  toSiUnit (value: number): number {
    return value * 60 * 60 * 24
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / (60 * 60 * 24))
  }
}
