import './css/style.css'
import { Patient } from './core/patient.js'
import { createElementPatient, updateElementPatient, removeElementPatient, removeElementPatientHTML } from './component/conteiner.js'

import { SortedLinkedList } from './core/linkedlistcustom.js'

const linkedlistcustom = new SortedLinkedList()

import IMask from 'imask';

const get = (e) => document.querySelector(e);
const gets = (e) => document.querySelectorAll(e);

const checkHasChild = get("#cb")
const checkPolygon = get("#checkbox svg polyline")


checkHasChild.addEventListener('change', () => {
    if (checkHasChild.checked) {
        checkPolygon.classList.remove('check')
    } else {
        checkPolygon.classList.add('check')
    }
})

function setStyleHasChild(check) {
    if (check) {
        checkPolygon.classList.remove('check')
    } else {
        checkPolygon.classList.add('check')
    }
}

const namePatient = get("#name")

function removeErrorNamePatient() {
    namePatient.classList.remove('error-field')
    var errorName = get("#name + p");
    if (errorName) {
        errorName.parentNode.removeChild(errorName);
    }
}

namePatient.addEventListener('input', () => {
    if ((namePatient.classList.contains("error-field")) && (namePatient.value.length >= 3)) {
        removeErrorNamePatient()
    }
})

const agePatient = get("#age")

const agePatientPattern = {
    mask: "000",
    lazy: true
}
const agePatientMasked = IMask(agePatient, agePatientPattern)

function removeErrorAgePatient() {
    agePatient.classList.remove('error-field')
    var errorAge = get("#age + p");
    if (errorAge) {
        errorAge.parentNode.removeChild(errorAge);
    }
}

agePatient.addEventListener('input', () => {
    if ((agePatient.classList.contains("error-field")) && (agePatient.value.length > 0)) {
        removeErrorAgePatient()
    }
})

const btnAdd = get("#add")

let patientList = []

globalThis.patientList = patientList

btnAdd.addEventListener('click', () => {
    var validate = true
    if (namePatient.value.length < 3) {
        removeErrorNamePatient()
        namePatient.classList.add("error-field")
        namePatient.insertAdjacentHTML('afterend', '<p class="error">Insira mais de 3 caracteres.</p>')
        validate = false
    }
    if (agePatient.value.length == 0) {
        removeErrorAgePatient()
        agePatient.classList.add("error-field")
        agePatient.insertAdjacentHTML('afterend', '<p class="error">Obrigatório.</p>')
        validate = false
    }
    if (validate) {
        var patient = new Patient(namePatient.value, Number(agePatient.value), checkHasChild.checked)
        linkedlistcustom.push(patient)
        namePatient.value = ''
        agePatient.value = ''
        agePatientMasked.masked.reset()
        checkHasChild.checked = false;
        createElementPatient(patient)
        updateElementPatient(linkedlistcustom)
        setStyleHasChild(false)
        var countWaiting = get('.counting-waiting p')
        countWaiting.innerText = Number(countWaiting.textContent) + 1
    }
})


const btnRemove = get("#remove")

function by_order(element) {
    var patient_item = get(`#${element.id}`)
    var style = window.getComputedStyle(patient_item)
    var order = style.getPropertyValue('order')
    return Number(order);
}


btnRemove.addEventListener('click', () => {
    var item = linkedlistcustom.removeAt(0)
    removeElementPatientHTML(`patient-${item.id}`)
})