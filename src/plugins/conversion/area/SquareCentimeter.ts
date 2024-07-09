import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'

export class SquareCentimeter extends AreaUnit {
  constructor() {
    super('unitAreaSquareCentimeter', 'cm2', ['cm2', 'square cm', 'square centimeter', 'square centimeters', 'square centimetre', 'square centimetres', 'quadratzentimeter'])
  }

  toSiUnit(value: number): number {
    return value / 10000.0
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 10000.0)
  }
}