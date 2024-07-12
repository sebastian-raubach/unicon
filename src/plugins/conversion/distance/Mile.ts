import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Yard } from './Yard'

export class Mile extends DistanceUnit {
  constructor() {
    super('unitDistanceMile', 'mi', ['mi', 'mile', 'miles', 'meile', 'meilen'], false, new Yard())
  }

  toSiUnit(value: number): number {
    return value * 1609.344
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1609.344)
  }
}