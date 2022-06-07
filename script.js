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
	toDoList = document.querySelector('.todo__list')

// Writing "No tasks yet" if tasklist is empty
const noTasksLabel = createNewElement('span', 'todo__no-tasks-label')
noTasksLabel.insertAdjacentText('afterbegin', 'No tasks yet :(')

let editItemBtns,
	deleteItemBtns,
	itemCheckboxes,
	editedItem = undefined

let listLength = checkListLength()
renderUserTasks()
toggleNoTasksLabel()
// getDataToLocalStorage()

toDo.addEventListener('click', e => {
	itemCheckboxes = Array.from(document.querySelectorAll('.checkbox__label'))

	deleteItemBtns = Array.from(document.querySelectorAll('.button--delete'))

	editItemBtns = Array.from(document.querySelectorAll('.button--edit'))

	if (e.target === addBtn) openCreateForm()

	if (e.target === cancelBtn) closeCreateForm()

	if (e.target === enterBtn) {
		if (editedItem) {
			editToDoItem()
		} else {
			createToDoItem()
		}
	}

	if (itemCheckboxes.includes(e.target)) toggleCheckItem(e.target)

	if (editItemBtns.includes(e.target)) sendItemValues(e.target)

	if (deleteItemBtns.includes(e.target)) deleteToDoItem(e.target)

	if (e.target === clearAllBtn) clearAllItems()
})
// ===== FUNCTIONS =====
function setTaskToLocalStorage(dataObj) {
	localStorage.setItem(
		`${listLength + 1}`,
		JSON.stringify(dataObj)
	)
}

function getDataToLocalStorage() {
	let userTasks = {}

	for (let i = 0; i < localStorage.length; i++) {
		let taskID = localStorage.key(i)
		userTasks[taskID] = JSON.parse(localStorage.getItem(taskID))
	}

	return userTasks
}
// TODO: исправить неправильные айдишники при загрузке
function renderUserTasks(tasks = getDataToLocalStorage()) {
	console.log(tasks)
	for (task in tasks) {
		renderToDoItem(tasks[task])
	}
}

function toggleNoTasksLabel() {
	!toDoList.children.length
		? toDoList.append(noTasksLabel)
		: noTasksLabel.remove()
}

function checkListLength() {
	return toDoList.querySelector('.todo__no-tasks-label')
		? 0
		: localStorage.length
}
// Open create form and load data for inputs
function openCreateForm(
	valuesObj = {
		item__name: '',
		item__description: '',
		item__date: '',
		item__time: '',
	}
) {
	createForm.classList.add('showed')

	inputName.value = valuesObj.item__name
	inputDescription.value = valuesObj.item__description
	inputDate.value = convertDate(valuesObj.item__date)
	inputTime.value = valuesObj.item__time
}

function closeCreateForm() {
	createForm.classList.remove('showed')
	editedItem = undefined
	clearInputs()
}

function clearInputs() {
	;[inputName.value, inputDescription.value, inputDate.value, inputTime.value] =
		['', '', '', '']
}

function renderToDoItem(itemObj) {
	let elemsSet = new Set([
		['li', 'todo__item hidden', `item-${listLength + 1}`],
		['div', 'checkbox', undefined],
		['input', 'checkbox__input', `check-${listLength + 1}`],
		['label', 'checkbox__label', undefined],
		['div', 'item__buttons', undefined],
		['button', 'button button--edit', `edit-${listLength + 1}`],
		['button', 'button button--delete', `delete-${listLength + 1}`],
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

	setTimeout(() => {
		newItemElem.classList.remove('hidden')
	}, 0)
}

function createToDoItem() {
	if (checkEmptyInput(inputName)) return 0

  let dataObj = {
    id: listLength + 1,
		name: inputName.value,
		description: inputDescription.value,
		date: inputDate.value,
		time: inputTime.value,
  }

	setTaskToLocalStorage(dataObj)
  renderToDoItem(dataObj)

  listLength++
	closeCreateForm()

	toggleNoTasksLabel()
}

function checkEmptyInput(targetInput) {
	if (targetInput.value.trim() === '') {
		targetInput.style.background = 'rgba(231,157, 157, 0.5)'
		setTimeout(() => {
			targetInput.style.background = 'transparent'
		}, 3000)
		return true
	} else return false
}

function createNewElement(elem) {
	let [elemTagName, elemClassName, elemID] = [...elem]

	let createdElem = document.createElement(elemTagName)
	createdElem.className = elemClassName

	if (elemID !== undefined) createdElem.id = elemID

	if (elemTagName === 'input') createdElem.type = 'checkbox'

	if (elemTagName === 'label')
		createdElem.setAttribute('for', `check-${listLength + 1}`)

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
// Convert values from date inputs
function convertDate(dateValue) {
	const dateFromInput = /(\d{4})-(\d{2})-(\d{2})/
	const dateFromItem = /(\d{2})\.(\d{2})\.(\d{4})/

	return dateFromInput.test(dateValue)
		? dateValue.replace(dateFromInput, '$3.$2.$1')
		: dateValue.replace(dateFromItem, '$3-$2-$1')
}
// Delete the task item
function deleteToDoItem(targetBtn) {
	let targetItem = targetBtn.parentNode.parentNode
	targetItem.style.transitionDelay = '0s'
	targetItem.classList.add('hidden')

	setTimeout(() => {
		targetItem.remove()
		toggleNoTasksLabel()
	}, 400)
}
// Toogle status of task (completed or uncompleted)
function toggleCheckItem(targetCheckbox) {
	let targetItem = targetCheckbox.parentNode.parentNode
	let targetEditBtn = targetItem
		.querySelector('.item__buttons')
		.querySelector('.button--edit')

	targetEditBtn.hasAttribute('disabled')
		? targetEditBtn.removeAttribute('disabled')
		: targetEditBtn.setAttribute('disabled', '')

	targetItem.classList.toggle('checked')
}
// Collect values of task into object & send it to create form
function sendItemValues(targetBtn) {
	let targetItem = targetBtn.parentNode.parentNode
	let targetValues = Array.from(
		targetItem.querySelector('.item__content').children
	)
	let valuesArr = targetValues.map(el => [el.className, el.innerText])
	let valuesObj = {
		item__name: '',
		item__description: '',
		item__date: '',
		item__time: '',
	}

	valuesArr.forEach(function (item) {
		if (valuesObj.hasOwnProperty(item[0])) {
			valuesObj[item[0]] = item[1]
		}
	})

	editedItem = targetItem.id
	openCreateForm(valuesObj)
}
// Editing information in an existing task
function editToDoItem() {
	let targetItem = document.querySelector(`#${editedItem}`)
	let targetItemContent = targetItem.querySelector('.item__content')
	let targetItemName = targetItemContent.querySelector('.item__name')
	let targetItemDescription =
		targetItemContent.querySelector('.item__description')
	let targetItemDate = targetItemContent.querySelector('.item__date')
	let targetItemTime = targetItemContent.querySelector('.item__time')

	if (checkEmptyInput(inputName)) return 0

	targetItemName.innerText = inputName.value
	// if the description input contains information
	if (!checkEmptyInput(inputDescription)) {
		// if there was no description in the task
		if (!targetItemDescription) {
			let newItemDescription = createNewElement('div', 'item__description')
			newItemDescription.innerText = inputDescription.value
			targetItemContent.append(newItemDescription)
			// if the description was already present in the task and it has been changed
		} else if (inputDescription.value !== targetItemDescription.innerText) {
			targetItemDescription.innerText = inputDescription.value
		}
		// if the description input is empty and was already present in the task
	} else if (targetItemDescription) targetItemDescription.remove()
	// if the date input contains information
	if (!checkEmptyInput(inputDate)) {
		// if there was no date in the task
		if (!targetItemDate) {
			let newItemDate = createNewElement('div', 'item__date')
			newItemDate.innerText = convertDate(inputDate.value)
			targetItemContent.append(newItemDate)
			// if the date was already present in the task and it has been changed
		} else if (convertDate(inputDate.value) !== targetItemDate.innerText) {
			targetItemDate.innerText = convertDate(inputDate.value)
		}
		// if the date input is empty and was already present in the task
	} else if (targetItemDate) targetItemDate.remove()
	// if the time input contains information
	if (!checkEmptyInput(inputTime)) {
		// if there was no time in the task
		if (!targetItemTime) {
			let newItemTime = createNewElement('div', 'item__time')
			newItemTime.innerText = inputTime.value
			targetItemContent.append(newItemTime)
			// if the time was already present in the task and it has been changed
		} else if (inputTime.value !== targetItemTime.innerText) {
			targetItemTime.innerText = inputTime.value
		}
		// if the time input is empty and was already present in the task
	} else if (targetItemTime) targetItemTime.remove()

	closeCreateForm()
	editedItem = undefined
}
// Clear task list
function clearAllItems() {
	let toDoListChildren = toDoList.children

	for (let item of toDoListChildren) {
		item.style.transitionDelay = '0s'
		item.classList.add('hidden')

		setTimeout(() => {
			item.remove()
			toggleNoTasksLabel()
			listLength = 0
		}, 400)
	}

  // localStorage.clear()
}
