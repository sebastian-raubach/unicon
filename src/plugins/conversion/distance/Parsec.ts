import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Kilometer } from './Kilometer'

export class Parsec extends DistanceUnit {
  constructor() {
    super('unitDistanceParsec', 'pc', ['pc', 'parsec', 'parsecs'], new Kilometer())
  }

  toSiUnit(value: number): number {
    return value * 30_856_775_812_800_000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 30_856_775_812_800_000)
  }
}