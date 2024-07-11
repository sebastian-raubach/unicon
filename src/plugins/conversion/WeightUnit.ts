import { Unit } from './Unit'

export abstract class WeightUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, 'unitTypeWeight', subUnit)
  }
}
