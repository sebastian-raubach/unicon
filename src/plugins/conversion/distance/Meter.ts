import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { SiUnit } from '../SiUnit'
import { Centimeter } from './Centimeter'

export class Meter extends DistanceUnit implements SiUnit {
  constructor() {
    super('unitDistanceMeter', 'm', ['m', 'meter', 'metre', 'meters', 'metres'], new Centimeter())
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value)
  }
}