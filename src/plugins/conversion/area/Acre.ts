import { ConversionResult } from '../ConversionResult'
import { AreaUnit } from '../AreaUnit'

export class Acre extends AreaUnit {
  constructor() {
    super('unitAreaAcre', 'ac', ['ac', 'acre', 'acres', 'acker'], false)
  }

  toSiUnit(value: number): number {
    return value * 4046.8564224
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 4046.8564224)
  }
}