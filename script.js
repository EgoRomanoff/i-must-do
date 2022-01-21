const toDo = document.querySelector('.todo'),
      addBtn = document.querySelector('#addBtn'),
      clearAllBtn = document.querySelector('#clearAllBtn'),createForm = document.querySelector('.todo__create-form'),inputName = document.querySelector('#inputName'),inputDescription = document.querySelector('#inputDescription'),
      inputDatetime = document.querySelector('#inputDatetime'),cancelBtn = document.querySelector('#cancelBtn'),
      enterBtn = document.querySelector('#enterBtn'),
      toDoList = document.querySelector('.todo__list')

const noTasksLabel = createNewElement('span', 'todo__no-tasks-label')
noTasksLabel.insertAdjacentText('afterbegin', 'No tasks yet :(')

let editItemBtns, deleteItemBtns, itemCheckboxes,
    listLength = checkListLength(),
    editedItem = undefined

toggleNoTasksLabel()

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

function toggleNoTasksLabel() {

  !toDoList.children.length ?
    toDoList.append(noTasksLabel) :
    noTasksLabel.remove()

}

function checkListLength() {

  return toDoList.querySelector('.todo__no-tasks-label') ? 0 : toDoList.children.length

}

function openCreateForm(taskName = '', taskDescription = '', taskDatetime = '') {

  createForm.classList.add('showed')

  inputName.value = taskName
  inputDescription.value = taskDescription
  inputDatetime.value = taskDatetime

}

function closeCreateForm() {
  createForm.classList.remove('showed')
  editedItem = undefined
  clearInputs()
}

function clearInputs() {
  [inputName.value, inputDescription.value, inputDatetime.value] = ['', '', '']
}

function createToDoItem() {

  if (checkEmptyInput(inputName)) {

    inputName.style.background = 'rgba(231,157, 157, 0.5)'
    setTimeout(() => {
      inputName.style.background = 'transparent'
    }, 3000)
    return 0

  }

  let tagsArr = ['li', 'div', 'input', 'label', 'div', 'button', 'button', 'div', 'div']

  let classesArr = ['todo__item hidden', 'checkbox', 'checkbox__input', 'checkbox__label', 'item__buttons', 'button button--edit', 'button button--delete', 'item__content', 'item__name']

  let idsArr = [`item-${listLength + 1}`, undefined, `check-${listLength + 1}`, undefined, undefined, `edit-${listLength + 1}`, `delete-${listLength + 1}`, undefined, undefined]

  if (inputDescription.value !== '') {
    tagsArr.push('div')
    classesArr.push('item__description')
  }

  if (inputDatetime.value !== '') {
    tagsArr.push('div')
    classesArr.push('item__datetime')
  }

  let elemsArr = []

  for (let i = 0; i < tagsArr.length; i++) {
    elemsArr.push(createNewElement(tagsArr[i], classesArr[i], idsArr[i]))
  }

  let newItemElem = elemsArr[0]
  let checkboxElem = elemsArr[1]
  let btnsElem = elemsArr[4]
  let contentElem = elemsArr[7]
  checkboxElem.append(elemsArr[2], elemsArr[3])
  btnsElem.append(elemsArr[5], elemsArr[6])

  let itemNameElem = elemsArr[8]

  itemNameElem.insertAdjacentText('afterbegin', inputName.value)

  contentElem.append(itemNameElem)

  if (classesArr.includes('item__description') && classesArr.includes('item__datetime')) {
    let itemDescriptionElem = elemsArr[9]
    let itemDatetimeElem = elemsArr[10]

    itemDescriptionElem.insertAdjacentText('afterbegin', inputDescription.value)
    itemDatetimeElem.insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))

    contentElem.append(itemDescriptionElem, itemDatetimeElem)

  } else if (classesArr.includes('item__description')) {

    let itemDescriptionElem = elemsArr[9]

    itemDescriptionElem.insertAdjacentText('afterbegin', inputDescription.value)

    contentElem.append(itemDescriptionElem)

  } else if (classesArr.includes('item__datetime')){

    let itemDatetimeElem = elemsArr[9]

    itemDatetimeElem.insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))

    contentElem.append(itemDatetimeElem)

  }

  newItemElem.append(checkboxElem, btnsElem, contentElem)
  toDoList.append(newItemElem)

  closeCreateForm()

  setTimeout(() => {
    toDoList.lastChild.classList.remove('hidden')
  }, 0)

  listLength++
  toggleNoTasksLabel()
}

function checkEmptyInput(targetInput) {

  return targetInput.value.trim() === '' ?
    true : false

}

function createNewElement(elemTagName, elemClassName, elemID = undefined) {
  let createdElem = document.createElement(elemTagName)
  createdElem.className = elemClassName

  if (elemID !== undefined) {
    createdElem.id = elemID
  }

  if (elemTagName === 'input') {
    createdElem.type = 'checkbox'
  }

  if (elemTagName === 'label') {
    createdElem.setAttribute('for', `check-${listLength + 1}`)
  }

  if (elemClassName === 'button button--edit') {
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="18" height="18" fill="#aaa"><path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"/></svg>')
  }

  if (elemClassName === 'button button--delete') {
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewbox="0 0 512 512" fill="#aaa"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>')
  }

  return createdElem
}

function convertDatetime(datetimeValue) {
  const datetimeFromInput = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  const datetimeFromItem = /(\d{2})\.(\d{2})\.(\d{4}) - (\d{2}):(\d{2})/

  return datetimeFromInput.test(datetimeValue) ?
    datetimeValue.replace(datetimeFromInput, '$3.$2.$1 - $4:$5') :
    datetimeValue.replace(datetimeFromItem, '$3-$2-$1T$4:$5')
}

function deleteToDoItem(targetBtn) {

  let targetItem = targetBtn.parentNode.parentNode
  targetItem.style.transitionDelay = '0s'
  targetItem.classList.add('hidden')

  setTimeout(() => {
    targetItem.remove()
    toggleNoTasksLabel()
  }, 400)

}

function toggleCheckItem(targetCheckbox) {

  let targetItem = targetCheckbox.parentNode.parentNode
  let targetEditBtn = targetItem.querySelector('.item__buttons').querySelector('.button--edit')

  if (targetEditBtn.hasAttribute('disabled')) {
    targetEditBtn.removeAttribute('disabled')
  } else {
    targetEditBtn.setAttribute('disabled', '')
  }

  targetItem.classList.toggle('checked')
}

function sendItemValues(targetBtn) {

  let values = []
  let targetItem = targetBtn.parentNode.parentNode
  let targetValues = Array.from(targetItem.querySelector('.item__content').children)

  editedItem = targetItem.id

  if (targetValues[0]) values.push(targetValues[0].innerText)
  if (targetValues[1]) values.push(targetValues[1].innerText)
  if (targetValues[2]) values.push(convertDatetime(targetValues[2].innerText))

  openCreateForm(values[0], values[1], values[2])

}

function editToDoItem() {

  let targetItem = document.querySelector(`#${editedItem}`)
  let targetItemContent = targetItem.querySelector('.item__content')

  let targetItemName = targetItemContent.querySelector('.item__name')
  let targetItemDescription = targetItemContent.querySelector('.item__description')
  let targetItemDatetime = targetItemContent.querySelector('.item__datetime')

  if (checkEmptyInput(inputName)) return 0

  targetItemName.innerText = inputName.value

  if (!checkEmptyInput(inputDescription)) {

    if (!targetItemDescription) {

      let newItemDescription = createNewElement('div', 'item__description')
      newItemDescription.insertAdjacentText('afterbegin', inputDescription.value)
      targetItemContent.append(newItemDescription)

    } else {

      if (inputDescription.value !== targetItemDescription.innerText) {
        targetItemDescription.insertAdjacentText('afterbegin', inputDescription.value)
      }

    }

  } else {

    if (targetItemDescription) targetItemDescription.remove()

  }

  if (!checkEmptyInput(inputDatetime)) {

    if (!targetItemDatetime) {

      let newItemDatetime = createNewElement('div', 'item__datetime')
      newItemDatetime.insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
      targetItemContent.append(newItemDatetime)

    } else {

      if (convertDatetime(inputDatetime.value) !== targetItemDatetime.innerText) {
        targetItemDatetime.insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
      }

    }

  } else {

    if (targetItemDatetime) targetItemDatetime.remove()

  }

  closeCreateForm()
  editedItem = undefined

}

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

}