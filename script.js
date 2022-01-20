const toDo = document.querySelector('.todo'),
      addBtn = document.querySelector('#addBtn'),
      clearAllBtn = document.querySelector('#clearAllBtn'),createForm = document.querySelector('.todo__create-form'),inputName = document.querySelector('#inputName'),inputDescription = document.querySelector('#inputDescription'),
      inputDatetime = document.querySelector('#inputDatetime'),cancelBtn = document.querySelector('#cancelBtn'),
      enterBtn = document.querySelector('#enterBtn'),
      toDoList = document.querySelector('.todo__list')

let editItemBtns, deleteItemBtns,
    listLength = toDoList.children.length,
    editedItem = undefined

const toDoListSpan = document.createElement('span')
toDoListSpan.className = 'todo__info-span'
toDoListSpan.insertAdjacentText('afterbegin', 'No tasks yet')

toDo.addEventListener('click', e => {
  deleteItemBtns = Array.from(document.querySelectorAll('.button--delete'))

  editItemBtns = Array.from(document.querySelectorAll('.button--edit'))

  if (e.target === addBtn) openCreateForm()
  if (e.target === cancelBtn) closeCreateForm()
  if (e.target === enterBtn) {
    if (editedItem) {
      editItemValues()
    } else {
      createToDoItem()
    }
  }
  if (deleteItemBtns.includes(e.target)) deleteToDoItem(e.target)
  if (editItemBtns.includes(e.target)) editToDoItem(e.target)

})
// ===== FUNCTIONS =====
function openCreateForm(taskName = '', taskDescription = '', taskDatetime = '') {

  createForm.classList.add('showed')

  inputName.value = taskName
  inputDescription.value = taskDescription
  inputDatetime.value = taskDatetime

}

function closeCreateForm() {
  createForm.classList.remove('showed')
  clearInputs()
}

function clearInputs() {
  [inputName.value, inputDescription.value, inputDatetime.value] = ['', '', '']
}

function createToDoItem() {

  if (!checkEmptyInput(inputName)) return 0

  let tagsArr = ['li', 'div', 'input', 'label', 'div', 'button', 'button', 'div', 'div']

  let classesArr = ['todo__item', 'checkbox', 'checkbox__input', 'checkbox__label', 'item__buttons', 'button button--edit', 'button button--delete', 'item__content', 'item__name']

  let idsArr = [`item-${listLength + 1}`, undefined, `check-${listLength + 1}`, undefined, undefined, `edit-${listLength + 1}`, `delete-${listLength + 1}`, undefined, undefined]
  // let newToDoItem = createNewElement('li', 'todo__item', `item-${listLength + 1}`)
  // let checkboxElem
  // let buttonsElem

  if (inputDescription.value !== '') {
    tagsArr.push('div')
    classesArr.push('item__description')
  }

  if (inputDatetime.value !== '') {
    tagsArr.push('div')
    classesArr.push('item__datetime')
  }

  let elemsArr = []
// TODO: ОСТАНОВИЛСЯ ЗДЕСЬ!!!!!!!!!!!!!!!!!!!!!!!!!!!
  for (let i = 0; i < tagsArr.length; i++) {
    elemsArr.push(createNewElement(tagsArr[i], classesArr[i]))
  }

  checkboxElem = elemsArr[0]
  checkboxElem.append(elemsArr[1], elemsArr[2])

  buttonsElem = elemsArr[3]
  buttonsElem.append(elemsArr[4], elemsArr[5])

  elemsArr[6].insertAdjacentText('afterbegin', inputName.value)
  newToDoItem.append(checkboxElem, buttonsElem, elemsArr[6])

  if (classesArr.includes('item__description') && classesArr.includes('item__datetime')) {
    elemsArr[7].insertAdjacentText('afterbegin', inputDescription.value)
    elemsArr[8].insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
    newToDoItem.append(elemsArr[7], elemsArr[8])
  } else if (classesArr.includes('item__description')) {
    elemsArr[7].insertAdjacentText('afterbegin', inputDescription.value)
    newToDoItem.append(elemsArr[7])
  } else if (classesArr.includes('item__datetime')){
    elemsArr[7].insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
    newToDoItem.append(elemsArr[7])
  }

  let infoSpan = document.querySelector('.todo__info-span')
  if (infoSpan) toDoList.children[0].remove()

  toDoList.append(newToDoItem)
  clearInputs()
  closeAddForm()
  setTimeout(() => {
    toDoList.lastChild.classList.remove('hidden')
  }, 0)

  listLength++
    // console.log(deleteItemBtn.length);
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
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="20" height="20" fill="#ccc"><path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"/></svg>')
  }

  if (elemClassName === 'button button--delete') {
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 512 512" fill="#ccc"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>')
  }

  return createdElem
}

function checkListLength() {
  if (toDoList.children.length === 0) {
    toDoList.append(toDoListSpan)
  }
}

function convertDatetime(curValue) {
  const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  const re2 = /(\d{2})\.(\d{2})\.(\d{4}) - (\d{2}):(\d{2})/

  if (re.test(curValue)) {
    return curValue.replace(re, '$3.$2.$1 - $4:$5')
  } else {
    return curValue.replace(re2, '$3-$2-$1T$4:$5')
  }
}

function deleteToDoItem(targetBtn) {

  let targetItem = targetBtn.parentNode.parentNode
  targetItem.style.transitionDelay = '0s'
  targetItem.classList.add('hidden')
  setTimeout(() => {
    targetItem.remove()
    checkListLength()
  }, 400)

}

function editToDoItem(targetBtn) {

  let targetItem = targetBtn.parentNode.parentNode
  let targetItemChildren = Array.from(targetItem.children)

  let values = []
  // openAddForm()

  if (targetItemChildren[2]) values.push(targetItemChildren[2].innerHTML)
  if (targetItemChildren[3]) values.push(targetItemChildren[3].innerHTML)
  if (targetItemChildren[4]) values.push(convertDatetime(targetItemChildren[4].innerHTML))

  editedItem = targetItem.id
  openAddForm(values[0], values[1], values[2])

  console.log(values)
}

function editItemValues() {
  let targetItemChildren = document.querySelector(`#${editedItem}`).children

  if (inputName.value !== '') {
    targetItemChildren[2].innerText = inputName.value
  }
  if (inputDescription.value !== '') {
    targetItemChildren[3].innerText = inputDescription.value
  }
  if (inputDatetime.value !== '') {
    targetItemChildren[4].innerText = convertDatetime(inputDatetime.value)
  }

  closeAddForm()
  // console.log(targetItem.children);
}

checkListLength()