import { ConversionResult } from '../ConversionResult'
import { DistanceUnit } from '../DistanceUnit'
import { Inch } from './Inch'

export class Foot extends DistanceUnit {
  constructor() {
    super('unitDistanceFoot', 'ft', ['ft', 'foot', 'feet', 'fuß', 'füße'], false, new Inch())
  }

  toSiUnit(value: number): number {
    return value / 3.28084
  }
  fromSiUnit(value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value * 3.28084)
  }
}