const addBtn = document.querySelector('.button--add')
const enterBtn = document.querySelector('#enterItemBtn')
const cancelBtn = document.querySelector('#cancelItemBtn')
const toDoList = document.querySelector('.todo__list')
const inputName = document.querySelector('#inputName')
const inputDescription = document.querySelector('#inputDescription')
const inputDatetime = document.querySelector('#inputDatetime')

enterBtn.addEventListener('click', createToDoItem)
cancelBtn.addEventListener('click', clearInputs)

function clearInputs() {
  inputName.value = ''
  inputDescription.value = ''
  inputDatetime.value = ''
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
    createdElem.insertAdjacentHTML('afterbegin', '<svg fill="#777777" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="18px" height="18px"><path d="M 36 5.0097656 C 34.205301 5.0097656 32.410791 5.6901377 31.050781 7.0507812 L 8.9160156 29.183594 C 8.4960384 29.603571 8.1884588 30.12585 8.0253906 30.699219 L 5.0585938 41.087891 A 1.50015 1.50015 0 0 0 6.9121094 42.941406 L 17.302734 39.974609 A 1.50015 1.50015 0 0 0 17.304688 39.972656 C 17.874212 39.808939 18.39521 39.50518 18.816406 39.083984 L 40.949219 16.949219 C 43.670344 14.228094 43.670344 9.7719064 40.949219 7.0507812 C 39.589209 5.6901377 37.794699 5.0097656 36 5.0097656 z M 36 7.9921875 C 37.020801 7.9921875 38.040182 8.3855186 38.826172 9.171875 A 1.50015 1.50015 0 0 0 38.828125 9.171875 C 40.403 10.74675 40.403 13.25325 38.828125 14.828125 L 36.888672 16.767578 L 31.232422 11.111328 L 33.171875 9.171875 C 33.957865 8.3855186 34.979199 7.9921875 36 7.9921875 z M 29.111328 13.232422 L 34.767578 18.888672 L 16.693359 36.962891 C 16.634729 37.021121 16.560472 37.065723 16.476562 37.089844 L 8.6835938 39.316406 L 10.910156 31.521484 A 1.50015 1.50015 0 0 0 10.910156 31.519531 C 10.933086 31.438901 10.975086 31.366709 11.037109 31.304688 L 29.111328 13.232422 z"/></svg>')
  } else if (classname === 'button button--delete') {
    createdElem.insertAdjacentHTML('afterbegin', '<svg fill="#777777" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 48 48" width="18px" height="18px"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/></svg>')
  }

  return createdElem
}

function convertDatetime(curValue) {
  const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/
  return curValue.replace(re, '$3.$2.$1 - $4:$5')
}

function createToDoItem() {

  let tagsArr = ['li', 'div', 'input', 'label', 'div', 'div', 'div', 'div', 'button', 'button']

  let classesArr = ['todo__item', 'checkbox', 'checkbox__input', 'checkbox__label', 'item__name', 'item__description', 'item__datetime', 'item__controls', 'button button--edit', 'button button--delete']

  let elemsArr = []

  for (let i = 0; i < tagsArr.length; i++) {
    elemsArr.push(createNewElement(tagsArr[i], classesArr[i]))
  }

  elemsArr[1].append(elemsArr[2], elemsArr[3])
  elemsArr[4].insertAdjacentText('afterbegin', inputName.value)
  elemsArr[5].insertAdjacentText('afterbegin', inputDescription.value)
  elemsArr[6].insertAdjacentText('afterbegin', convertDatetime(inputDatetime.value))
  elemsArr[7].append(elemsArr[8], elemsArr[9])
  elemsArr[0].append(elemsArr[1], elemsArr[4], elemsArr[5], elemsArr[6], elemsArr[7])
  // console.log(newToDoItem);
  toDoList.append(elemsArr[0])
  clearInputs()
}