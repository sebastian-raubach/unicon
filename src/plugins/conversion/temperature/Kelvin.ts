import { ConversionResult } from '../ConversionResult'
import { TemperatureUnit } from '../TemperatureUnit'

export class Kelvin extends TemperatureUnit {
  constructor() {
    super('unitTemperatureKelvin', 'k', ['k', 'kelvin'], true)
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}