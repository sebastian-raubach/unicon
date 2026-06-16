import { Unit } from '@/plugins/conversion/Unit'

export abstract class SpeedUnit extends Unit {
  constructor (name: string, primaryAbbreviation: string, abbreviations: string[], isSiUnit: boolean, subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, isSiUnit, 'unitTypeSpeed', subUnit)
  }
}
