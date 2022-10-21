export class Patient {
    static total = 0
    constructor(name = '', age = 0, hasChild = false) {
        this.id = Patient.total
        this.name = name.toUpperCase();
        this.age = age
        this.hasChild = hasChild
        Patient.total += 1
        var now = new Date();
        this.time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    }
}