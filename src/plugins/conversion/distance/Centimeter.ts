import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'

export class Centimeter extends DistanceUnit {
  constructor() {
    super('unitDistanceCentimeter', 'cm', ['cm', 'centimeter', 'centimetre', 'centimeters', 'centimetres', 'zentimeter'])
  }

  toSiUnit(value: number): number {
    return value / 1000
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1000)
  }
}