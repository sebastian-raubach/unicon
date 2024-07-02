import { DistanceUnit } from '../DistanceUnit'

export class Yard extends DistanceUnit {
  constructor() {
    super('unitDistanceYard', 'yd', ['yd', 'yard', 'yards'])
  }

  toSiUnit(value: number): number {
    return value / 1.0936132983
  }
  fromSiUnit(value: number): number {
    return value * 1.0936132983
  }
}