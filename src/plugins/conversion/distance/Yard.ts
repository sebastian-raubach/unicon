import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Foot } from './Foot'

export class Yard extends DistanceUnit {
  constructor() {
    super('unitDistanceYard', 'yd', ['yd', 'yard', 'yards'], new Foot())
  }

  toSiUnit(value: number): number {
    return value / 1.0936132983
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 1.0936132983)
  }
}