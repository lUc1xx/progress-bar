# Вертикальный Progress Bar

## Установка
1. Установить jquery
```sh
npm i jquery
```

2. Установить  is-in-viewport
```sh
npm i is-in-viewport
```
3. Склонировать к себе в проект файл progress-bar.js
4. Сделать import или подключить файл progress-bar.js напрямую, например
```js
import { ProgressBar } from "./progress-bar.js";
```

5. Добавить в HTML разметку:

```html
<div class="progress-bar" id="BLOCK_ID"></div> 
```
где BLOCK_ID - задайте любое значение, нужен для инициализация плагина

6. Добавить progress-bar.css или progress-bar.sass файл к себе в проект
7. Иниацилизировать плагин, код:
```js
 
const progressBar = new ProgressBar('#progress-bar', { // BLOCK_ID 
	classStart: '.start', // блок, после которого начинается отображение progress bar, по умолчанию класс start
	classEnd: '.end',	  // блок, на котором прекращается оторабражение progress bar, по умолчанию класс end
	animationSpeed: 400,  // скорость анимации, по умолчанию 0
	items: [
		{
			'positionProgress': 1, // позиция анимационной линии 
			'blockId': '#steps', // id блока к которому привязан элемент в Progress bar
 			'text': 'Этапы <br> реализации' // текст элемента в Progress bar
		},
		{
			'positionProgress': 2,
			'blockId': '#costs',
			'text': 'Итоговая <br> стоимость'
		},
		{
			'positionProgress': 3,
			'blockId': '#reasons',
			'text': '5 причин <br> выбрать <br>нас'
		},
		{
			'positionProgress': 4,
			'blockId': '#how',
			'text': 'С чего <br> начать?'
		},
	],
})
```

