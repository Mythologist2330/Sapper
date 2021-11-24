const sapper = document.getElementById('sapper');
let area = [];



sapper.addEventListener('click', checkIsBombs);

function checkIsBombs(event) {
    idX = +event.path[1].id.split('')[1];
    idY = +event.path[0].id.split('')[1];


    function clickOnField(x, y) {
        if (area[x][y].isBomb) {
            document.getElementById(`${x}` + `${y}`).innerHTML = 'bomb';
            console.log('GAME OVER')
        } else {
            let value = checkNeighbours(x, y);

            if (value === 0) {

                if (!(x - 1 < 0 || y - 1 < 0 || x - 1 > area.length - 1 || y - 1 > area[0].length - 1)) {
                    checkNeighbours(x - 1, y - 1);
                }
                if (!(x - 1 < 0 || y < 0 || x - 1 > area.length - 1 || y > area[0].length - 1)) {
                    checkNeighbours(x - 1, y);
                }
                if (!(x - 1 < 0 || y + 1 < 0 || x - 1 > area.length - 1 || y + 1 > area[0].length - 1)) {
                    checkNeighbours(x - 1, y + 1);
                }

                if (!(x < 0 || y - 1 < 0 || x > area.length - 1 || y - 1 > area[0].length - 1)) {
                    checkNeighbours(x, y - 1);
                }
                if (!(x < 0 || y + 1 < 0 || x > area.length - 1 || y + 1 > area[0].length - 1)) {
                    checkNeighbours(x, y + 1);
                }

                if (!(x + 1 < 0 || y - 1 < 0 || x + 1 > area.length - 1 || y - 1 > area[0].length - 1)) {
                    checkNeighbours(x + 1, y - 1);
                }
                if (!(x + 1 < 0 || y < 0 || x + 1 > area.length - 1 || y > area[0].length - 1)) {
                    checkNeighbours(x + 1, y);
                }
                if (!(x + 1 < 0 || y + 1 < 0 || x + 1 > area.length - 1 || y + 1 > area[0].length - 1)) {
                    checkNeighbours(x + 1, y + 1);
                }



            }
        }
    }





    function checkNeighbours(x, y) {
        let bomb = 0;
        bomb += checkBombOnField(x - 1, y - 1);
        bomb += checkBombOnField(x - 1, y);
        bomb += checkBombOnField(x - 1, y + 1);

        bomb += checkBombOnField(x, y - 1);
        bomb += checkBombOnField(x, y + 1);

        bomb += checkBombOnField(x + 1, y - 1);
        bomb += checkBombOnField(x + 1, y);
        bomb += checkBombOnField(x + 1, y + 1);

        document.getElementById(`${x}` + `${y}`).innerHTML = bomb;
        return bomb;
    }

    function checkBombOnField(x, y) {
        if (x < 0 || y < 0 || x > area.length - 1 || y > area[0].length - 1) {
            return 0;
        }

        if (area[x][y].isBomb) {
            return 1;
        } else {
            return 0;
        }
    }

    clickOnField(idX, idY);
}


function createArea(x, y, bombs) {
    for (let i = 0; i < x; i++) {
        let lineX = [];
        let elemX = document.createElement('div');
        sapper.appendChild(elemX).setAttribute('id', 'x' + i);

        for (let j = 0; j < y; j++) {
            lineX.push({
                name: j,
                isBomb: false
            });

            let elemY = document.createElement('div');
            elemX.appendChild(elemY).setAttribute('id', `${i}` + j);
        }

        area.push(lineX);
    }

    area = renderBombs(bombs);
}


function renderBombs(bombsAmount) {
    for (let i = 0; i < bombsAmount; i++) {
        let x = Math.floor(Math.random() * area.length);
        let y = Math.floor(Math.random() * area[0].length);

        if (area[x][y].isBomb !== true) {
            area[x][y].isBomb = true;
        } else {
            i--
        }
    }

    return area;
}


createArea(10, 10, 10);