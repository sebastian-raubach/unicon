import { Unit } from "./conversion/Unit"

export class PotentialPart {
  value: number
  unit: string

  constructor (value: number, unit: string) {
    this.value = value
    this.unit = unit
  }

  isValid (possibleUnits: Unit[]): boolean {
    return this.findUnit(possibleUnits) !== undefined
  }

  findUnit (possibleUnits: Unit[]): Unit | undefined {
    if (this.unit.length > 0) {
      const lower = this.unit.trim().toLowerCase()
      return possibleUnits.find(u => u.abbreviations.some(a => a.toLocaleLowerCase() === lower))
    } else {
      return undefined
    }
  }
}
