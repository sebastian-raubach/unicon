import { DistanceUnit } from '../DistanceUnit'

export class Mile extends DistanceUnit {
  constructor() {
    super('unitDistanceMile', 'mi', ['mi', 'mile', 'miles'])
  }

  toSiUnit(value: number): number {
    return value * 1609.344
  }
  fromSiUnit(value: number): number {
    return value / 1609.344
  }
}