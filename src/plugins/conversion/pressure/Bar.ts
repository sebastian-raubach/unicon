import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { PressureUnit } from '@/plugins/conversion/PressureUnit'

export class Bar extends PressureUnit {
  constructor () {
    super('unitPressureBar', 'bar', ['bar'], false)
  }

  toSiUnit (value: number): number {
    return value * 100_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 100_000)
  }
}
