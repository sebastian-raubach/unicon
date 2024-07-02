import { VolumeUnit } from '../VolumeUnit'

export class PintUk extends VolumeUnit {
  constructor() {
    super('unitVolumePintUk', 'pt UK', ['pint', 'pt', 'pt UK', 'pt (UK)', 'pint UK', 'pint (UK)', 'pints'])
  }

  toSiUnit(value: number): number {
    return value / 1759.7539863927
  }
  fromSiUnit(value: number): number {
    return value * 1759.7539863927
  }
}