import { TemperatureUnit } from '../TemperatureUnit'

export class Fahrenheit extends TemperatureUnit {
  constructor() {
    super('unitTemperatureFahrenheit', 'f', ['f', 'fahrenheit', '°f'])
  }

  toSiUnit(value: number): number {
    return 5 / 9 * (value + 459.67)
  }
  fromSiUnit(value: number): number {
    return 9 / 5 * value - 459.67
  }
}