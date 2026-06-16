import type { ConversionResult } from '@/plugins/conversion/ConversionResult'
import { PressureUnit } from '@/plugins/conversion/PressureUnit'

export class Psi extends PressureUnit {
  constructor () {
    super('unitPressurePsi', 'psi', ['psi'], false)
  }

  toSiUnit (value: number): number {
    return value * 6894.7572931783
  }

  fromSiUnit (value: number): ConversionResult[] {
    return this.adjustSubUnits(value, value / 6894.7572931783)
  }
}
