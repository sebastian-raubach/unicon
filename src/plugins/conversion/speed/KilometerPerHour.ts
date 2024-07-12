import { ConversionResult } from '../ConversionResult'
import { SpeedUnit } from '../SpeedUnit'

export class KilometerPerHour extends SpeedUnit {
  constructor() {
    super('unitSpeedKilometerPerHour', 'km/h', ['km/h', 'kmh', 'kph', 'kilometer/hour', 'metre/hour', 'kilometers/hour', 'kilometre/hour', 'kilometer per hour', 'metre per hour', 'kilometers per hour', 'kilometre per hour', 'kilometer/stunde', 'kilometer pro stunde'], false)
  }

  toSiUnit(value: number): number {
    return value / 3.6
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 3.6)
  }
}