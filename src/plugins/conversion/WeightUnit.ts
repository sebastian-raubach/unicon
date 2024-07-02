import { Unit } from './Unit'

export abstract class WeightUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[]) {
    super(name, primaryAbbreviation, abbreviations, 'weight')
  }
}
