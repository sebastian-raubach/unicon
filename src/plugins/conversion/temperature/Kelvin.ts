import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { TemperatureUnit } from '@/plugins/conversion/TemperatureUnit'

export class Kelvin extends TemperatureUnit {
  constructor () {
    super('unitTemperatureKelvin', 'k', ['k', 'kelvin'], true)
  }

  toSiUnit (value: number): number {
    return value
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}
