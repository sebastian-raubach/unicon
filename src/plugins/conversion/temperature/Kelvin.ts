import { TemperatureUnit } from '../TemperatureUnit'

export class Kelvin extends TemperatureUnit {
  constructor() {
    super('unitTemperatureKelvin', 'k', ['k', 'kelvin'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}