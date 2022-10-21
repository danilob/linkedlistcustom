const get = (e) => document.querySelector(e);
const MAXSIZE = 15
export function createElementPatient(patient) {
    var container = get('#queue')
    container.insertAdjacentHTML('beforeend', `
				<div id="patient-${patient.id}" class="patient ${(patient.hasChild) ? 'c-priority' : ''}" >
          <p class="patient-age">${patient.age}</p>
          <p class="patient-name">${(patient.name.length <= MAXSIZE) ? patient.name : patient.name.slice(0, MAXSIZE) + '...'}</p>
          <p class="patient-haschild">${(patient.hasChild) ? 'COM' : 'SEM'} CRIANÇA</p>
          <p class="patient-time-arrived">${patient.time}</p>
        </div>
		`)
}


export function removeElementPatient(patient) {
    var element = get(`#patient-${patient.id}`)
    element.parentNode.removeChild(element);
}