import { Unit } from './Unit'

export abstract class PressureUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], isSiUnit: boolean, subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, isSiUnit, 'unitTypePressure', subUnit)
  }
}
