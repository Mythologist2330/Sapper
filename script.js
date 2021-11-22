const sapper = document.getElementById('sapper');
const bombsArr = [];
let area = [];



sapper.addEventListener('click', checkIsBombs);

function checkIsBombs(event) {
    idX = +event.path[1].id.split('')[1];
    idY = +event.target.id.split('')[1];

    let b = bombsArr.filter((b) => {
        if (b[0] === idX && b[1] === idY) {
            return b;
        }
    })

    if (b.length === 0) {
        console.log('Норм');
        // console.log(area[idX][idY].checkNeighbours(idX));
    } else {
        console.log('Всё, хана!');
    }










    function clickOnField(x, y) {
        return area[x][y].isBombs ? console.log('GAME OVER') : checkNeighbours(x, y);
    }

    function checkBombOnField(x, y) {
        if (x < 0 || y < 0 || x >= area.lenght || y >= area[0].lenght) {
            return 0;
        }

        if (!area[x][y].isChecked) {
            return 0;
        }

        if (area[x][y].isBomb) {
            return 1;
        } else {
            checkNeighbours(x, y);
            return 0;
        }
    }

    function checkNeighbours(x, y) {
        let bomb = 0;
        bomb += checkBombOnField(x - 1, y);
        bomb += checkBombOnField(x - 1, y - 1);
        bomb += checkBombOnField(x - 1, y + 1);
        bomb += checkBombOnField(x, y - 1);
        bomb += checkBombOnField(x + 1, y - 1);
        bomb += checkBombOnField(x + 1, y);
        bomb += checkBombOnField(x + 1, y + 1);
        bomb += checkBombOnField(x, y + 1);
    }

    console.log(clickOnField(idX, idY));
}


function createArea(x, y, bombs) {

    for (let i = 0; i < x; i++) {
        let lineX = [];
        let elemX = document.createElement('div');
        sapper.appendChild(elemX).setAttribute('id', 'x' + i);

        for (let j = 0; j < y; j++) {
            lineX.push({
                name: j,
                value: 0,
                isBomb: false,
                checkNeighbours(idX) {
                    let neighbourVar = [
                        area[idX - 1][this.value - 1],
                        area[idX - 1][this.value],
                        area[idX - 1][this.value + 1],

                        area[idX][this.value - 1],
                        area[idX][this.value + 1],

                        area[idX + 1][this.value - 1],
                        area[idX + 1][this.value],
                        area[idX + 1][this.value + 1]
                    ];

                    let neighbours = [];

                    for (let i = 0; i < neighbourVar.length; i++) {
                        if (neighbourVar[i] !== undefined) {
                            neighbours.push(neighbourVar[i]);
                        }
                    }

                    return neighbours;
                }
            });

            let elemY = document.createElement('div');
            elemX.appendChild(elemY).setAttribute('id', 'y' + j);

            // Удалить позже
            elemY.innerHTML = j;
        }

        area.push(lineX);
    }

    area = renderBombs(area, bombs);

    console.log(area)
}


function renderBombs(area, bombsAmount) {
    for (let i = 0; i < bombsAmount; i++) {
        let x = Math.floor(Math.random() * area.length);
        let y = Math.floor(Math.random() * area[0].length);

        if (area[x][y].value !== 'b') {
            area[x][y].value = 'b';
            area[x][y].isBomb = true;
            bombsArr.push([x, y]);
        } else {
            i--
        }
    }

    return area;
}


createArea(10, 10, 7);












// function getCountBombsAround(idX, idY) {
    
// }



