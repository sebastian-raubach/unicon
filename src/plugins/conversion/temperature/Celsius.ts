import { TemperatureUnit } from '../TemperatureUnit'

export class Celsius extends TemperatureUnit {
  constructor() {
    super('unitTemperatureCelsius', 'c', ['c', 'celsius', '°c'])
  }

  toSiUnit(value: number): number {
    return value + 273.15
  }
  fromSiUnit(value: number): number {
    return value - 273.15
  }
}