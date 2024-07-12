import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Centimeter } from './Centimeter'

export class Meter extends DistanceUnit {
  constructor() {
    super('unitDistanceMeter', 'm', ['m', 'meter', 'metre', 'meters', 'metres'], true, new Centimeter())
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}