import { Unit } from './Unit'

export abstract class WeightUnit extends Unit {
  constructor(name: string, abbreviations: string[]) {
    super(name, abbreviations, 'weight')
  }
}
