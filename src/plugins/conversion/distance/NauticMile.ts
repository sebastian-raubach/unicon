import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'

export class NauticMile extends DistanceUnit {
  constructor() {
    super('unitDistanceNauticMile', 'nm', ['nm', 'nautic mile', 'nautic miles', 'seemeile', 'seemeilen'], false)
  }

  toSiUnit(value: number): number {
    return value * 1852
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 1852)
  }
}