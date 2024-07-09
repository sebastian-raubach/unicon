import { ConversionResult } from '../ConversionResult'
import { SiUnit } from '../SiUnit'
import { TemperatureUnit } from '../TemperatureUnit'

export class Kelvin extends TemperatureUnit implements SiUnit {
  constructor() {
    super('unitTemperatureKelvin', 'k', ['k', 'kelvin'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}