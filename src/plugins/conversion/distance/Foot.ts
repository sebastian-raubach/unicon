import { DistanceUnit } from '../DistanceUnit'

export class Foot extends DistanceUnit {
  constructor() {
    super('unitDistanceFoot', ['ft'])
  }

  toSiUnit(value: number): number {
    return value / 3.28084
  }
  fromSiUnit(value: number): number {
    return value * 3.28084
  }
}