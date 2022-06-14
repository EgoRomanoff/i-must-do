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

### Добавление задачи
![add-task](https://user-images.githubusercontent.com/67374276/173626224-6ab8f15e-4b79-4ed3-9f93-84773993e76e.gif)

### Редактирование задачи
![edit-task](https://user-images.githubusercontent.com/67374276/173627070-02da0d49-641c-4b75-8b03-9d304b9b92ed.gif)

### Пометка выполненной задачи
![check-task](https://user-images.githubusercontent.com/67374276/173627559-d02a318c-77ea-47ab-b4fc-f9ee9e3ea95c.gif)

### Удаление задачи
![delete-task](https://user-images.githubusercontent.com/67374276/173628257-7d23572e-619d-42bb-a290-5b206b3c701c.gif)

### Удаление всех задач
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
