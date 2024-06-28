import { DistanceUnit } from '../DistanceUnit'

export class Meter extends DistanceUnit {
  constructor() {
    super('unitDistanceMeter', ['m'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}