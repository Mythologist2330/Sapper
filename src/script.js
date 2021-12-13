// @ts-check
(function () {
    let area = [];
    let bombs = [];

    const sapper = document.getElementById('sapper');
    const form = document.forms['start-form'];
    form.addEventListener('submit', submitForm);

    /**
     * Получает из формы размеры поля и кол-во бомб на нём
     * @param {SubmitEvent & { target: HTMLInputElement }} e submit event
     */
    function submitForm(e) {
        e.preventDefault();
        const x = e.target.children['coord-x'].value;
        const y = e.target.children['coord-y'].value;
        const bombs = e.target.children['bombs'].value;

        if (area.length) {
            clearArea();
        }
        createArea(x, y, bombs);
        sapper.addEventListener('click', processingId);
    }

    /**
     * Возвращает начальное состояние приложения
     */
    function clearArea() {
        area = [];
        sapper.replaceChildren();
    }

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
            [x + 1, y + 1],
        ];
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
    function getAmountBombsAround(x, y) {
        let bomb = 0;
        getCoordsNeighbours(x, y)
            .filter(isFieldExists)
            .forEach(([x, y]) => (bomb += checkBombOnField(x, y)));
        document.getElementById(x + '-' + y).style.backgroundColor = '#333';
        document.getElementById(x + '-' + y).innerHTML = bomb ? bomb.toString() : null;
        return bomb;
    }

    /**
     * Проверка кликнутой клетки на наличие бомбы или запуск проверки соседних клеток
     * @param {number} x координата по x
     * @param {number} y координата по y
     */
    function clickOnField(x, y) {
        const amountBombs = getAmountBombsAround(x, y);
        if (area[x][y].isBomb) {
            gameOver();
        } else if (!amountBombs) {
            getCoordsNeighbours(x, y)
                .filter(isFieldExists)
                .forEach(value => checkField(value));
        }
    }

    /**
     * Game Over :)
     */
    function gameOver() {
        sapper.removeEventListener('click', processingId);
        bombs.forEach(([x, y]) => {
            document.getElementById(x + '-' + y).style.backgroundColor = '#f00';
            document.getElementById(x + '-' + y).innerHTML = '!';
        });
    }

    /**
     * Проверяет клетку
     * @param {number[]} field координаты по осям X и Y
     */
    function checkField(field) {
        const [x, y] = field;
        let val = getAmountBombsAround(x, y);
        if (!val && !area[x][y].isChecked) {
            area[x][y].isChecked = true;
            clickOnField(x, y);
        }
    }

    /**
     * Проверяет есть ли указаная клетка на игровом поле
     * @param {number[]} field координаты по осям X и Y
     * @returns {boolean} true или false
     */
    function isFieldExists(field) {
        const [x, y] = field;
        return x >= 0 && y >= 0 && x < area.length && y < area[0].length;
    }

    /**
     * Обработка ids и запуск функции с проверками
     * @param {MouseEvent} event
     */
    function processingId(event) {
        // @ts-ignore
        const [idX, idY] = event.path[0].id.split('-');
        clickOnField(parseInt(idX), parseInt(idY));
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
            sapper.appendChild(elemX).setAttribute('id', `x${i}`);

            for (let j = 0; j < y; j++) {
                lineX.push({
                    name: j,
                    isBomb: false,
                    isChecked: false,
                });
                const elemY = document.createElement('div');
                elemX.appendChild(elemY).setAttribute('id', `${i}-${j}`);
            }
            area.push(lineX);
        }
        renderBombs(bombs);
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
            bombs.push([x, y]);

            if (!area[x][y].isBomb) {
                area[x][y].isBomb = true;
            } else {
                i--;
            }
        }
        return area;
    }
})();