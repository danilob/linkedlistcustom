const get = (e) => document.querySelector(e);
const MAXSIZE = 15
export function createElementPatient(patient) {
    var container = get('#queue')
    container.insertAdjacentHTML('beforeend', `
				<div id="patient-${patient.id}" class="patient ${(patient.hasChild || patient.age >= 60) ? 'c-priority' : ''}" >
          <p class="patient-age">${patient.age}</p>
          <p class="patient-name">${(patient.name.length <= MAXSIZE) ? patient.name : patient.name.slice(0, MAXSIZE) + '...'}</p>
          <p class="patient-haschild">${(patient.hasChild) ? 'COM' : 'SEM'} CRIANÇA</p>
          <p class="patient-time-arrived">${patient.time}</p>
        </div>
		`)
    get(`#remove`).style.display = 'block'
}


export function removeElementPatient(patient) {
    var element = get(`#patient-${patient.id}`)
    var countAttendence = get('.counting-served p')
    countAttendence.innerText = Number(countAttendence.textContent) + 1
    element.parentNode.removeChild(element);
}

export function removeElementPatientHTML(id) {
    var element = get(`#${id}`)
    var countAttendence = get('.counting-served p')
    countAttendence.innerText = Number(countAttendence.textContent) + 1
    var countWaiting = get('.counting-waiting p')
    var countWaitingNew = Number(countWaiting.textContent) - 1
    countWaiting.innerText = countWaitingNew
    var showLastOne = get('.last-one-description p')
    var name = get(`#${id} .patient-name`).textContent
    var age = Number(get(`#${id} .patient-age`).textContent)
    var hasChildText = get(`#${id} .patient-haschild`).textContent
    var hasChild = hasChildText === 'COM CRIANÇA'
    var now = new Date();
    var time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    showLastOne.innerText = `${name} ${(age >= 60 || hasChild) ? '(P)' : ''} às ${time}`
    element.parentNode.removeChild(element);
    if (countWaitingNew === 0) {
        get(`#remove`).style.display = 'none'
    }
}