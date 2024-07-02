import { DistanceUnit } from '../DistanceUnit'

export class Meter extends DistanceUnit {
  constructor() {
    super('unitDistanceMeter', 'm', ['m', 'meter', 'metre', 'meters', 'metres'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}