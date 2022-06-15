<h1 align="center"> I must do </h1>
<p align="center">Простое ToDo web-приложение</p>
<p align="center">https://egoromanoff.github.io/i-must-do/</p>

![html5](https://user-images.githubusercontent.com/67374276/173600400-3b7d7727-8319-40c5-8a4a-2a2467f27a5f.svg)
![css3](https://user-images.githubusercontent.com/67374276/173600464-370cede0-ab20-47d7-a634-b27f0648219c.svg)
![sass](https://user-images.githubusercontent.com/67374276/173600491-30d078f5-516d-44bf-8650-8bf470ab2a65.svg)
![javascript](https://user-images.githubusercontent.com/67374276/173600513-85a7d65a-2633-4dee-a6b4-5b7c992b57a9.svg)
___
**I Must Do** - web менеджер задач с простым функционалом:

* добавление новых задач
* редактирование имеющихся задач
* пометка выполненной задачи
* удаление одной или всех задач сразу
___
## Особенности разработки

Целями создания этого приложения были:
* знакомство с возможностями Local Storage и работа с ним
* взаимодействие с DOM-деревом через JavaScript
* попытка написать динамическое web-приложение без использования фреймворков и библиотек
___
## Работа с приложением (демо)

### Добавление, редактирование и выполнение задачи
![add-task](https://user-images.githubusercontent.com/67374276/173626224-6ab8f15e-4b79-4ed3-9f93-84773993e76e.gif)
![edit-task](https://user-images.githubusercontent.com/67374276/173627070-02da0d49-641c-4b75-8b03-9d304b9b92ed.gif)
![check-task](https://user-images.githubusercontent.com/67374276/173627559-d02a318c-77ea-47ab-b4fc-f9ee9e3ea95c.gif)

### Удаление одной или всех задач
![delete-task](https://user-images.githubusercontent.com/67374276/173628257-7d23572e-619d-42bb-a290-5b206b3c701c.gif)
![clear-all](https://user-images.githubusercontent.com/67374276/173628640-18509015-1d6d-4735-8e5c-47d09a810bb5.gif)

___
## Технические особенности

### Хранение данных в Local Storage
Все данные о задачах пользователя хранятся в Local Storage браузера. Каждая задача хранится в виде такого объекта:
```json
{
  "id": 1,
  "name": "Написать README.md",
  "description": "Добавить описание для проекта на Github",
  "date": "2022-06-14",
  "time": "20:00",
  "checked": false
}
```
___
### Рендер элементов в списке задач
При загрузке приложения или добавлении новой задачи HTML-элементы создаются с помощью функций `renderToDoItem(itemObj)` и `createNewElement(elem)`.

<details><summary><i><b>renderToDoItem(itemObj)</b></i></summary>
<p>

```javascript
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
```

</p>
</details>
  
<details><summary><i><b>createNewElement(elem)</b></i></summary>
<p>

```javascript
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
```

</p>
</details>

При редактировании задачи вызывается функция `rerenderItemContent(value, elemClassName)`.
<details><summary><i><b>createNewElement(elem)</b></i></summary>
<p>

```javascript
function rerenderItemContent(value, elemClassName) {
  let elem = editedItem.querySelector(`.${elemClassName}`)

  if (value) {
    if (!elem) {
      let newElem = createNewElement(['div', elemClassName, undefined])
      newElem.innerText = value
      editedItem.querySelector('.item__content').append(newElem)
    } else if (value !== elem.innerText) elem.innerText = value
  } else {
    if (elem) elem.remove()
  }
}
```

</p>
</details>

___
