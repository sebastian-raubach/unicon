import { Unit } from './Unit'

export abstract class TemperatureUnit extends Unit {
  constructor(name: string, primaryAbbreviation: string, abbreviations: string[], isSiUnit: boolean, subUnit?: Unit) {
    super(name, primaryAbbreviation, abbreviations, isSiUnit, 'unitTypeTemperature', subUnit)
  }
}
