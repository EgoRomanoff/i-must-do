const addBtn = document.querySelector('#add-button')
const clearAllBtn = document.querySelector('#clear-all-button')
const addForm = document.querySelector('.todo__add-form')
const enterBtn = document.querySelector('#enterItemBtn')
const cancelBtn = document.querySelector('#cancelItemBtn')
const toDoList = document.querySelector('.todo__list')
const inputName = document.querySelector('#inputName')
const inputDescription = document.querySelector('#inputDescription')
const inputDatetime = document.querySelector('#inputDatetime')
const editBtn = document.querySelector('#edit-button')
const delteItemBtn = document.querySelector('#close-button')

addBtn.addEventListener('click', openAddForm)
enterBtn.addEventListener('click', createToDoItem)
cancelBtn.addEventListener('click', closeAddForm)
// deleteItemBtn.addEventListener('click', deleteToDoItem(e.target))

function openAddForm() {
  addForm.classList.add('showed')
}

function closeAddForm() {
  addForm.classList.remove('showed')
  clearInputs()
}

function clearInputs() {
  inputName.value = ''
  inputDescription.value = ''
  inputDatetime.value = ''
}

function validateForm() {
  // TODO: добавить проверку строки на пробельные символы
  if (inputName.value === '') {
    return false
  } else {
    return true
  }
}

function createNewElement(tagname, classname) {
  let createdElem = document.createElement(tagname)
  createdElem.className = classname

  if (tagname === 'input') {
    createdElem.id = 'check'
    createdElem.type = 'checkbox'
  }

  if (tagname === 'label') {
    createdElem.setAttribute('for', 'check')
  }

  if (classname === 'button button--edit') {
    createdElem.id = 'edit-button'
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="20" height="20" fill="#ccc"><path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"/></svg>')
  } else if (classname === 'button button--delete') {
    createdElem.id = 'close-button'
    createdElem.insertAdjacentHTML('afterbegin', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 512 512" fill="#ccc"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>')
  }

  return createdElem
}

function convertDatetime(curValue) {
  const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  return curValue.replace(re, '$3.$2.$1 - $4:$5')
}
// TODO: ИСПРАВИТЬ ФУНКЦИЮ!!!!
function createToDoItem() {

  if (!validateForm()) {

    return 0

  } else {

    let newToDoItem = document.createElement('li')
    newToDoItem.className = 'todo__item hidden'

    let tagsArr = ['div', 'input', 'label', 'div', 'button', 'button', 'div']

    let classesArr = ['checkbox', 'checkbox__input', 'checkbox__label', 'item__buttons', 'button button--edit', 'button button--delete', 'item__name']

    let elemsArr = []

    // console.log(inputDescription.value, inputDatetime.value)

    if (inputDescription.value !== '') {
      tagsArr.push('div')
      classesArr.push('item__description')
    }

    if (inputDatetime.value !== '') {
      tagsArr.push('div')
      classesArr.push('item__datetime')
    }

    // console.log(tagsArr, classesArr);

    for (let i = 0; i < tagsArr.length; i++) {
      elemsArr.push(createNewElement(tagsArr[i], classesArr[i]))
    }

    // console.log(elemsArr);

    newToDoItem.append(elemsArr[0].append(elemsArr[1], elemsArr[2]))

    console.log(newToDoItem);

    elemsArr[3].append(elemsArr[4], elemsArr[5])
    elemsArr[6].insertAdjacentText('afterbegin', inputName.value)

    // console.log(elemsArr);

    if (classesArr.includes('item__description') && classesArr.includes('item__datetime')) {
      console.log('и то и другое');
      elemsArr[7].insertAdjacentText('afterbegin', inputDescription.value)
      elemsArr[8].insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
    }

    if (classesArr.includes('item__description')) {
      console.log('только описание');
      elemsArr[7].insertAdjacentText('afterbegin', inputDescription.value)
    }

    if (classesArr.includes('item__datetime')){
      console.log('только дата');
      console.log(inputDatetime.value);
      elemsArr[7].insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
    }

    // console.log(elemsArr);
    // elemsArr[0].append(elemsArr[1], elemsArr[4], elemsArr[5], elemsArr[6], elemsArr[7])
    newToDoItem.append(...elemsArr)

    // console.log(elemsArr);
    console.log(newToDoItem);

    toDoList.append(newToDoItem)
    clearInputs()
    closeAddForm()
    setTimeout(() => {
      toDoList.lastChild.classList.remove('hidden')
    }, 0)

  }

}

// function deleteToDoItem() {

// }