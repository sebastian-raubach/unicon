import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Meter } from './Meter'

export class Kilometer extends DistanceUnit {
  constructor() {
    super('unitDistanceKilometer', 'km', ['km', 'kilometer', 'kilometre', 'kilometers', 'kilometres'], new Meter())
  }

  toSiUnit(value: number): number {
    return value * 1000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1000)
  }
}