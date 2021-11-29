const sapper = document.getElementById('sapper');
let area = [];

/**
 * Получение позиции соседних клеток на поле
 * @param {number} x координата по x
 * @param {number} y координата по y
 * @returns массив с позициями соседних клеток
 */
function getCoordsNeighbours(x, y) {
    return [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1]
    ]
}

/**
 * Проверка наличия бомбы
 * @param {number} x координата по x
 * @param {number} y координата по y
 * @returns число есть ли бомба в клетке
 */
function checkBombOnField(x, y) {
    return area[x][y].isBomb ? 1 : 0;
}

/**
 * Проверка соседних клеток на наличие бомб
 * @param {number} x координата по x
 * @param {number} y координата по y
 * @returns число с кол-во бомб вокруг
 */
function checkNeighbours(x, y) {
    let bomb = 0;
    getCoordsNeighbours(x, y).forEach(elem => {
        if (elem[0] >= 0 && elem[1] >= 0 && elem[0] < area.length && elem[1] < area[0].length) {
            bomb += checkBombOnField(elem[0], elem[1]);
        }
    });
    document.getElementById(`${x}` + `${y}`).innerHTML = bomb;
    return bomb;
}

/**
 * Проверка кликнутой клетки на наличие бомбы или запуск проверки соседних клеток
 * @param {number} x координата по x
 * @param {number} y координата по y
 */
function clickOnField(x, y) {
    const value = checkNeighbours(x, y);

    if (area[x][y].isBomb) {
        document.getElementById(`${x}` + `${y}`).innerHTML = 'bomb';
        console.log('GAME OVER')
    } else if (value === 0) {
        getCoordsNeighbours(x, y).forEach(elem => {
            if (elem[0] >= 0 && elem[1] >= 0 && elem[0] < area.length && elem[1] < area[0].length) {
                let val = checkNeighbours(elem[0], elem[1]);
                if (val === 0 && area[elem[0]][elem[1]].isChecked === false) {
                    area[elem[0]][elem[1]].isChecked = true;
                    clickOnField(elem[0], elem[1]);
                }
            }
        });
    }
}

/**
 * Обработка ids и запуск функции с проверками
 * @param {*} event
 */
function processingId(event) {
    idX = +event.path[1].id.split('')[1];
    idY = +event.path[0].id.split('')[1];
    clickOnField(idX, idY);
}

/**
 * Отрисовка поля на frontend
 * @param {number} x координата по x
 * @param {number} y координата по y
 * @param {number} bombs кол-во бомб на поле
 */
function createArea(x, y, bombs) {
    for (let i = 0; i < x; i++) {
        const lineX = [];
        const elemX = document.createElement('div');
        sapper.appendChild(elemX).setAttribute('id', `x${  i}`);

        for (let j = 0; j < y; j++) {
            lineX.push({
                name: j,
                isBomb: false,
                isChecked: false
            });
            const elemY = document.createElement('div');
            elemX.appendChild(elemY).setAttribute('id', `${i}${  j}`);
        }
        area.push(lineX);
    }
    area = renderBombs(bombs);
}

/**
 * Создание бомб на поле
 * @param {number} bombsAmount кол-во бомб
 * @returns поле с бомбами
 */
function renderBombs(bombsAmount) {
    for (let i = 0; i < bombsAmount; i++) {
        const x = Math.floor(Math.random() * area.length);
        const y = Math.floor(Math.random() * area[0].length);

        if (!area[x][y].isBomb) {
            area[x][y].isBomb = true;
        } else {
            i--
        }
    }
    return area;
}


createArea(10, 10, 10);
sapper.addEventListener('click', processingId);