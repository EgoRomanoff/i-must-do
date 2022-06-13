const toDo = document.querySelector('.todo'),
	addBtn = document.querySelector('#addBtn'),
	clearAllBtn = document.querySelector('#clearAllBtn'),
	createForm = document.querySelector('.todo__create-form'),
	inputName = document.querySelector('#inputName'),
	inputDescription = document.querySelector('#inputDescription'),
	inputDate = document.querySelector('#inputDate'),
	inputTime = document.querySelector('#inputTime'),
	cancelBtn = document.querySelector('#cancelBtn'),
	enterBtn = document.querySelector('#enterBtn'),
	toDoList = document.querySelector('.todo__list'),
  modal = document.querySelector('.modal'),
  modalYesButton = document.querySelector('#modalYesBtn'),
  modalCancelButton = document.querySelector('#modalCancelBtn'),
	noTasksLabel = createNewElement(['span', 'todo__no-tasks-label', undefined])
noTasksLabel.innerText = 'No tasks yet\n Add your first one!'

let itemCheckboxes = [],
	editItemBtns = [],
	deleteItemBtns = [],
	editedItem = undefined,
	editedValues = undefined,
	listLength = localStorage.length,
	lastID = 0

loadUserTasks()
toggleNoTasksLabel()
updateArraysOfElements()

toDo.addEventListener('click', e => {
	if (e.target === addBtn) openCreateForm()
	if (e.target === clearAllBtn) showModal(e.target)// clearAllItems()
})

createForm.addEventListener('click', e => {
  if (e.target === cancelBtn) closeCreateForm()
  if (e.target === enterBtn) {
    if (editedValues) {
      editToDoItem()
    } else {
      createToDoItem()
    }
  }
})

toDoList.addEventListener('click', e => {
	if (itemCheckboxes.includes(e.target)) toggleCheckItem(e.target)
	if (editItemBtns.includes(e.target)) sendItemValues(e.target)
	if (deleteItemBtns.includes(e.target)) deleteToDoItem(e.target)
})
// ===== FUNCTIONS =====
// Loads all tasks from localStorage when the application starts
// The argument takes the value returned from the getDataFromLocalStorage()
function loadUserTasks(tasks = getDataFromLocalStorage()) {
  if (!tasks) return 0

	for (task in tasks) {
		renderToDoItem(tasks[task])
	}
}
// Get all data from localStorage
// Returns an object containing all the data
function getDataFromLocalStorage() {
  if (!listLength) return 0
	let userTasks = {}

	for (let i = 0; i < localStorage.length; i++) {
		let taskID = localStorage.key(i)
		userTasks[taskID] = JSON.parse(localStorage.getItem(taskID))
	}

	return userTasks
}
// Renders the html element for the task
// The argument takes an object containing data about the task:
// {id: int, name: string, description: string, date: string, time: string}
function renderToDoItem(itemObj) {
	let elemsSet = new Set([
		['li', 'todo__item hidden', itemObj.id],
		['div', 'checkbox', undefined],
		['input', 'checkbox__input', `check-${itemObj.id}`],
		['label', 'checkbox__label', undefined],
		['div', 'item__buttons', undefined],
		['button', 'button button--edit', undefined],
		['button', 'button button--delete', undefined],
		['div', 'item__content', undefined],
		['div', 'item__name', undefined],
	])
	let elemsArr = []

	if (itemObj.description !== '') {
		elemsSet.add(['div', 'item__description', undefined])
	}

	if (itemObj.date !== '') {
		elemsSet.add(['div', 'item__date', undefined])
	}

	if (itemObj.time !== '') {
		elemsSet.add(['div', 'item__time', undefined])
	}

	elemsSet.forEach(elem => elemsArr.push(createNewElement(elem)))

	let checkboxElem = elemsArr.find(el => el.className === 'checkbox')
	checkboxElem.append(
		elemsArr.find(el => el.className === 'checkbox__input'),
		elemsArr.find(el => el.className === 'checkbox__label')
	)

	let btnsElem = elemsArr.find(el => el.className === 'item__buttons')
	btnsElem.append(
		elemsArr.find(el => el.className === 'button button--edit'),
		elemsArr.find(el => el.className === 'button button--delete')
	)

	let contentElem = elemsArr.find(el => el.className === 'item__content')
	let itemNameElem = elemsArr.find(el => el.className === 'item__name')
	itemNameElem.innerText = itemObj.name
	contentElem.append(itemNameElem)

	if (elemsArr.find(el => el.className === 'item__description')) {
		let itemDescriptionElem = elemsArr.find(
			el => el.className === 'item__description'
		)
		itemDescriptionElem.innerText = itemObj.description
		contentElem.append(itemDescriptionElem)
	}

	if (elemsArr.find(el => el.className === 'item__date')) {
		let itemDateElem = elemsArr.find(el => el.className === 'item__date')
		itemDateElem.innerText = convertDate(itemObj.date)
		contentElem.append(itemDateElem)
	}

	if (elemsArr.find(el => el.className === 'item__time')) {
		let itemTimeElem = elemsArr.find(el => el.className === 'item__time')
		itemTimeElem.innerText = itemObj.time
		contentElem.append(itemTimeElem)
	}

	let newItemElem = elemsArr.find(el => el.className === 'todo__item hidden')
	newItemElem.append(checkboxElem, btnsElem, contentElem)
	toDoList.append(newItemElem)

  if (itemObj.checked === true) {
    newItemElem.querySelector('.button--edit').setAttribute('disabled', '')
    newItemElem.querySelector('.checkbox__input').checked = true
    newItemElem.classList.toggle('checked')
  }

	lastID = itemObj.id

	setTimeout(() => {
		newItemElem.classList.remove('hidden')
	}, 0)
}
// Show modal window
function showModal(targetBtn) {
  modal.style.display = 'flex'

  setTimeout(() => {
    modal.classList.add('showed')
    document.addEventListener('click', modalHandler)
  }, 0)

}

function modalHandler(e) {
  if (e.target === modal.querySelector('.modal__content')) return
  if (e.target === modalYesButton) clearAllItems()
  modal.classList.remove('showed')
  document.removeEventListener('click', modalHandler)
  setTimeout(() => {
    modal.style.display = 'none'
  }, 350)
}
// Returns an html element
// The argument takes an array of [html tag (string), css class (string), id (string or undefined)]
function createNewElement(elem) {
	let [elemTagName, elemClassName, elemID] = [...elem]

	let createdElem = document.createElement(elemTagName)
	createdElem.className = elemClassName

	if (elemID !== undefined) createdElem.id = elemID

	if (elemTagName === 'input') createdElem.type = 'checkbox'

	if (elemTagName === 'label')
		createdElem.setAttribute('for', `check-${lastID + 1}`)

	if (elemClassName === 'button button--edit') {
		createdElem.insertAdjacentHTML(
			'afterbegin',
			'<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="18" height="18" fill="#aaa"><path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"/></svg>'
		)
	}

	if (elemClassName === 'button button--delete') {
		createdElem.insertAdjacentHTML(
			'afterbegin',
			'<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewbox="0 0 512 512" fill="#aaa"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>'
		)
	}

	return createdElem
}
// Convert values from date inputs and returns them
// Takes a string with the date value as an argument
function convertDate(dateValue) {
	const dateFromInput = /(\d{4})-(\d{2})-(\d{2})/,
		dateFromItem = /(\d{2})\.(\d{2})\.(\d{4})/

	return dateFromInput.test(dateValue)
		? dateValue.replace(dateFromInput, '$3.$2.$1')
		: dateValue.replace(dateFromItem, '$3-$2-$1')
}
// Toggles the noTasksLabel
function toggleNoTasksLabel() {
	!listLength ? toDoList.append(noTasksLabel) : noTasksLabel.remove()
}
// Updates arrays with dynamic elements (checkboxes, edit and delete buttons)
function updateArraysOfElements() {
	itemCheckboxes = Array.from(document.querySelectorAll('.checkbox__label'))
	editItemBtns = Array.from(document.querySelectorAll('.button--edit'))
	deleteItemBtns = Array.from(document.querySelectorAll('.button--delete'))
}
// Open create form and load data for inputs
// The argument takes an object with data to fill in the form inputs
function openCreateForm(
	dataObj = {
		name: '',
		description: '',
		date: '',
		time: '',
	}
) {
	createForm.classList.add('showed')

	inputName.value = dataObj.name
	inputDescription.value = dataObj.description
	inputDate.value = dataObj.date
	inputTime.value = dataObj.time

	inputName.focus()
	createForm.addEventListener('keyup', enterKeyUpHandler)
}
// Handler for the event listener of keyup event
function enterKeyUpHandler(e) {
	if (e.code === 'Enter') {
		e.preventDefault()
		editedItem ? editToDoItem() : createToDoItem()
	}
}
// Clear task list
function clearAllItems() {
	let toDoListChildren = toDoList.children
  localStorage.clear()
	listLength = 0
	lastID = 0
	updateArraysOfElements()

	for (let item of toDoListChildren) {
		item.style.transitionDelay = '0s'
		item.classList.add('hidden')

		setTimeout(() => {
			item.remove()
			toggleNoTasksLabel()
		}, 400)
	}
}
// Close createForm and cancels all changes
function closeCreateForm() {
	createForm.classList.remove('showed')
	editedItem = undefined
	;[inputName.value, inputDescription.value, inputDate.value, inputTime.value] =
		['', '', '', '']
	createForm.removeEventListener('keyup', enterKeyUpHandler)
}
// Editing information in an existing task
function editToDoItem() {
	if (checkEmptyInput(inputName)) return 0

	let dataObj = {
		id: editedItem.id,
		name: inputName.value,
		description: inputDescription.value,
		date: inputDate.value,
		time: inputTime.value,
    checked: false
	}
	setTaskToLocalStorage(dataObj)
	editedItem.querySelector('.item__name').innerText = dataObj.name
	rerenderItemContent(dataObj.description, 'item__description')
	rerenderItemContent(convertDate(dataObj.date), 'item__date')
	rerenderItemContent(dataObj.time, 'item__time')
	closeCreateForm()
	editedItem = editedValues = undefined
}
// Checks if the input is empty
// Takes the target input as an argument
// Returns a boolean value
function checkEmptyInput(targetInput) {
	if (targetInput.value.trim() === '') {
		targetInput.style.background = 'rgba(231,157, 157, 0.5)'
		setTimeout(() => {
			targetInput.style.background = 'transparent'
		}, 3000)
		return true
	} else return false
}
// Uploads the task data to localStorage
// The argument takes an object with task data
function setTaskToLocalStorage(dataObj) {
	localStorage.setItem(`${dataObj.id}`, JSON.stringify(dataObj))
  listLength = localStorage.length
}
// Rerenders html element when editing a task
// The arguments take the value from the input and the class of the html element
function rerenderItemContent(value, elemClassName) {
	let elem = editedItem.querySelector(`.${elemClassName}`)

	if (value) {
		// Если инпут не пустой
		if (!elem) {
			// Если элемента нет
			let newElem = createNewElement(['div', elemClassName, undefined])
			newElem.innerText = value
			editedItem.querySelector('.item__content').append(newElem)
		} else if (value !== elem.innerText) elem.innerText = value // Если элемент есть и значения разные
	} else {
		// Если инпут пустой
		if (elem) elem.remove()
	}
}
// Creates a new html element for a task based on data from createForm
function createToDoItem() {
	if (checkEmptyInput(inputName)) return 0

	let dataObj = {
		id: lastID + 1,
		name: inputName.value,
		description: inputDescription.value,
		date: inputDate.value,
		time: inputTime.value,
    checked: false
	}

	setTaskToLocalStorage(dataObj)
	renderToDoItem(dataObj)
	toggleNoTasksLabel()
	updateArraysOfElements()
	closeCreateForm()
}
// Toogle status of task (completed or uncompleted)
// The arguments take target checkbox
function toggleCheckItem(targetCheckbox) {
  console.log(targetCheckbox);
	let targetItem = targetCheckbox.parentNode.parentNode
	let targetEditBtn = targetItem.querySelector('.button--edit')
  let checkedValues = JSON.parse(localStorage.getItem(targetItem.id))
  console.log(checkedValues)

  if (targetEditBtn.hasAttribute('disabled')) {
    targetEditBtn.removeAttribute('disabled')
    checkedValues.checked = false
  } else {
    targetEditBtn.setAttribute('disabled', '')
    checkedValues.checked = true
  }

  setTaskToLocalStorage(checkedValues)
	targetItem.classList.toggle('checked')
}
// Collect values of task into object and send it to createForm
// The arguments take target button
function sendItemValues(targetBtn) {
	editedItem = targetBtn.parentNode.parentNode
	editedValues = JSON.parse(localStorage.getItem(editedItem.id))
	openCreateForm(editedValues)
}
// Delete the task item
function deleteToDoItem(targetBtn) {
	let targetItem = targetBtn.parentNode.parentNode
	targetItem.style.transitionDelay = '0s'
	targetItem.classList.add('hidden')
	localStorage.removeItem(`${targetItem.id}`)
	listLength = localStorage.length
	updateArraysOfElements()

	setTimeout(() => {
		targetItem.remove()
		toggleNoTasksLabel()
	}, 400)
}