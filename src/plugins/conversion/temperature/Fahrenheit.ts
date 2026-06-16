import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { TemperatureUnit } from '@/plugins/conversion/TemperatureUnit'

export class Fahrenheit extends TemperatureUnit {
  constructor () {
    super('unitTemperatureFahrenheit', 'f', ['f', 'fahrenheit', '°f'], false)
  }

  toSiUnit (value: number): number {
    return 5 / 9 * (value + 459.67)
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, 9 / 5 * value - 459.67)
  }
}
