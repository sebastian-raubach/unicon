import { Unit } from './Unit'

export abstract class TimeUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[]) {
    super(name, primaryAbbreviation, abbreviations, 'time')
  }
}
