import { getActualHour } from '/src/component/conteiner.js'

export class Patient {
    static total = 0
    constructor(name = '', age = 0, hasChild = false) {
        this.id = Patient.total
        this.name = name.toUpperCase();
        this.age = age
        this.hasChild = hasChild
        Patient.total += 1
        this.time = getActualHour()
    }

    isPriority() {
        return this.age >= 60 || this.hasChild

    }
}