let firstTurnedCardIndex; // дефолтное значение индекса первой карты
let firstTurnedCardId; // дефолтное значение data-id первой карты

const rules = document.querySelector('.rules');
const cards = document.querySelector('.cards');
const form = document.querySelector('.form');

const player = { // объект с инфой игрока
  name: null,
  surname: null,
  email: null,
  score: null
};
let ratingList = []; // массив всех результатов
let ratingItem = []; // массив куда запишем имя и время

const fragment = document.createDocumentFragment();
const cardsItem = document.createElement('img');
fragment.appendChild(cardsItem);
cardsItem.classList.add('cards__item');

// функция начала игры
function init(obj) {
  dataOfCards.shuffle(); // рандомное перемешивание первонач массива
  // поменять рубашку карт согласно наличию класса form__active
  for (let i = 0; i < formImage.length; i++) {
    if (formImage[i].classList.contains('form__active')) {
      obj.style.backgroundImage = "url('./img/" + i + ".png')";
      obj.classList.remove('cards__item--turned'); // у всех карт убрать классы переворачивания
      memoryObj.shirt = obj.style.backgroundImage;  // сохраняем в св-во объекта инфу о выбраной рубашке
    }
  }
  // выложить карты (+новый класс) согласно наличию класса form__active
  if (formItemLevel[1].classList.contains('form__active')) {
    randomMixArrays(0, 9); // добавить 18 карт
    addCards(); // добавление карт на поле
  } else if (formItemLevel[2].classList.contains('form__active')) {
    randomMixArrays(); // добавить 24 карты
    addCards();
  } else {
    randomMixArrays(0, 5); // добавить 10 карт
    addCards();
  }
  return memoryObj; // возврат объекта с инфой о выбранной рубашке и уровне сложности
}

// функция вывода поздравлений
function outputResult() {
  clearInterval(countTime); // остановка таймера
  popupTime.textContent = min.textContent + ' : ' + sec.textContent; // вывод результата таймера
  if (!popupGame.classList.contains('popup--show') ) {
    popupGame.classList.add('popup--show');
  }

  // заполняем профиль игрока в объект и добавляем в хранилище
  player.name = document.getElementsByName('name')[0].value;
  player.surname = document.getElementsByName('surname')[0].value;
  player.email = document.getElementsByName('email')[0].value;
  player.score = +timeInMinutes.textContent * 60 + +timeInSeconds.textContent; // перевод в секунды
  window.localStorage.setItem('player', JSON.stringify(player)); // в хранилище будет добавлено значение

  // добавляем время игрока в массив и сохраняем таблицу 10-ти лучших в хранилище
  ratingList = JSON.parse(window.localStorage.getItem('ratingList')); // вернёт массив значений лежащих в хранилище
  if (!ratingList) {
    ratingList = [];
  }
  if (ratingList.length == 10) {
    ratingList.sort(function(a, b) {
      return a[1] - b[1];
    });
    ratingList = ratingList.slice(0, 9);
  }

  const nameUser = document.getElementsByName('name')[0].value;
  let scoreUser = +timeInMinutes.textContent * 60 + +timeInSeconds.textContent; // перевод в секунды
  ratingItem[0] = nameUser;
  ratingItem[1] = scoreUser;
  ratingList.push(ratingItem);

  if ((ratingList.length > 0) && ratingList[ratingList.length - 1][1] > scoreUser) {
    ratingList[ratingList.length - 1][0] = nameUser;
    ratingList[ratingList.length - 1][1] = scoreUser;
  }
  if (ratingList.length > 1) {
    ratingList.sort(function(a, b) {
      return a[1] - b[1];
    });
  }
  window.localStorage.setItem('ratingList', JSON.stringify(ratingList)); // в хранилище будет добавлено значение

  // отрисовываем таблицу результатов
  const ratingTable = document.createElement('table');
  const headRow = document.createElement('tr');
  ratingTable.appendChild(headRow);
  ratingTable.classList.add('popup__table-tag');

  // отрисовываем шапку
  for (let i = 0; i < 3; i++) {
    const headCell = document.createElement('th');
    headCell.classList.add('popup__cell');
    if (i == 0) headCell.innerHTML = '№';
    if (i == 1) headCell.innerHTML = 'Name';
    if (i == 2) headCell.innerHTML = 'Time';
    headRow.appendChild(headCell);
  }

  for (let i = 0; i < 10; i++) {
    const tableRow = document.createElement('tr');
    ratingTable.appendChild(tableRow);
    for (let j = 0; j < 3; j++) {
      const tableCell = document.createElement('td');
      if (j == 0) tableCell.innerHTML = `${i + 1}`; // внести номер позиции
      if (ratingList[i]) {
        if (j == 1) tableCell.innerHTML = `${ratingList[i][0]}`; // внести имя
        if (j == 2) tableCell.innerHTML = `${ratingList[i][1]}`; // внести время
      }
      tableCell.classList.add('popup__cell');
      tableRow.appendChild(tableCell);
    }
  }
  popupTable.appendChild(ratingTable);
}

// обработчик поворота карты
cardsItems.addEventListener('click', function(e) {
  if (e.target.classList.contains('cards__item--turned') && !e.target.classList.contains('cards__items')) {
    e.target.style.backgroundImage = memoryObj.shirt; // смена картинки на рубашку
    e.target.classList.toggle('cards__item--turned');
    firstTurnedCardId = null; // удаляем id первой карты из глобальной области видимости
    firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости

  } else if (!e.target.classList.contains('cards__items')) {
    e.target.classList.toggle('cards__item--turned');
    setTimeout(function() {
      e.target.style.backgroundImage =  "url('./img/" + e.target.getAttribute('data-bg') + "'), url('./img/white.png')";
    }, 300);
    const arrOfCards = document.querySelectorAll('.cards__item'); // массив карт
    let count = 0; // счётчик для кол-ва открытых карт

    for (let i = 0; i < arrOfCards.length; i++) {
      if (arrOfCards[i].classList.contains('cards__item--turned')) {
        count++;
      }
      if (count == 1 && arrOfCards[i].classList.contains('cards__item--turned')) { // находим первую открытую карту и сохраняем её id
        if (!firstTurnedCardId) { // если индекса первой карты не задан, то задаём id первой карты
          firstTurnedCardId = arrOfCards[i].getAttribute('data-id');
        }
        if (!firstTurnedCardIndex) { // если индекса первой карты не задан, то задаём
          firstTurnedCardIndex = i;
        }
      }
      if (count == 2) { // если уже есть 2 открытые карты

        if (e.target.getAttribute('data-id') == firstTurnedCardId) { // сравниваем id активной карты и открытой, если они равны
          setTimeout(function() {
            e.target.style.visibility = 'hidden'; // скрываем вторую карту
            e.target.classList.remove('cards__item--turned');
            e.target.classList.remove('cards__item'); // убираем из массива
            arrOfCards[firstTurnedCardIndex].style.visibility = 'hidden'; // скрываем первую карту
            arrOfCards[firstTurnedCardIndex].classList.remove('cards__item--turned');
            arrOfCards[firstTurnedCardIndex].classList.remove('cards__item'); // убираем из массива
            firstTurnedCardId = null; // удаляем id первой карты
            firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости
          }, 500);
          if (arrOfCards.length < 4) { // вывод поздравлений игроку
            setTimeout(function() {
              outputResult();
            }, 700);
          }
        } else { // если id не совпали
          setTimeout(function() {
            e.target.style.backgroundImage = memoryObj.shirt; // закрываем вторую карту
            e.target.classList.toggle('cards__item--turned');
            arrOfCards[firstTurnedCardIndex].style.backgroundImage = memoryObj.shirt; // закрываем первую карту
            arrOfCards[firstTurnedCardIndex].classList.toggle('cards__item--turned');
            firstTurnedCardId = null; // удаляем id первой карты из глобальной области видимости
            firstTurnedCardIndex = null; // удаляем индекс первой карты из глобальной области видимости
          }, 700);
        }
        break;
      }
    }
  }
});

// обработчик закрытия попапов ESC
window.addEventListener('keydown', function(event) {
  if (event.keyCode === ESC_KEYCODE) {
    if (popupGame.classList.contains('popup--show')) {
      popupGame.classList.remove('popup--show');
      clearInterval(countTime); // остановка таймера
      closeCardsField(); // выход из игрового поля
    }
  }
});

// обработчик для новой игры
popupBtnGame.addEventListener('click', function(event) {
  if (popupGame.classList.contains('popup--show')) {
    popupGame.classList.remove('popup--show');
  }
  cardsItems.innerHTML = ''; // удаление карт
  calcTime(0, 0, 1); // обнуление таймера
  init(cardsItem); // инициализация игры
  countTime = setInterval(calcTime, 1000);
});

// обработчик для выхода из игры
popupBtnExit.addEventListener('click', function() {
  if (popupGame.classList.contains('popup--show')) {
    popupGame.classList.remove('popup--show');
  }
  calcTime(0, 0, 1); // обнуление таймера
  closeCardsField(); // выход из игрового поля
});
