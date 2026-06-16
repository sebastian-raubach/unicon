import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { TemperatureUnit } from '@/plugins/conversion/TemperatureUnit'

export class Celsius extends TemperatureUnit {
  constructor () {
    super('unitTemperatureCelsius', 'c', ['c', 'celsius', '°c'], false)
  }

  toSiUnit (value: number): number {
    return value + 273.15
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value - 273.15)
  }
}
