import { TimeUnit } from '../TimeUnit'

export class Second extends TimeUnit {
  constructor() {
    super('unitTimeSecond', 's', ['s', 'second', 'seconds', 'sekunde', 'sekunden'])
  }

  toSiUnit(value: number): number {
    return value
  }
  fromSiUnit(value: number): number {
    return value
  }
}