import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { AreaUnit } from '@/plugins/conversion/AreaUnit'

export class Hectare extends AreaUnit {
  constructor () {
    super('unitAreaHectare', 'ha', ['ha', 'hectare', 'hectares', 'hektar', 'hektare'], false)
  }

  toSiUnit (value: number): number {
    return value * 10_000
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 10_000)
  }
}
