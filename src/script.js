const sapper = document.getElementById('sapper');
let area = [];

function getCoordsNeighbours(x,y) {
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

function checkBombOnField(x, y) {
    if (x < 0 || y < 0 || x > area.length - 1 || y > area[0].length - 1) {
        return 0;
    }
    return area[x][y].isBomb ? 1 : 0;    
}    

function checkNeighbours(x, y) {
    let bomb = 0;
    getCoordsNeighbours(x, y).forEach(elem => bomb += checkBombOnField(elem[0], elem[1]));
    document.getElementById(`${x}` + `${y}`).innerHTML = bomb;
    return bomb;
}

function clickOnField(x, y) {
    if (area[x][y].isBomb) {
        document.getElementById(`${x}` + `${y}`).innerHTML = 'bomb';
        console.log('GAME OVER')
        return;
    }
        
    const value = checkNeighbours(x, y);
    if (!value && !(x - 1 < 0 || y - 1 < 0 || x - 1 > area.length - 1 || y - 1 > area[0].length - 1)) {
        getCoordsNeighbours(x, y).forEach(elem => checkNeighbours(elem[0], elem[1]));
    }
}

function checkIsBombs(event) {
    idX = +event.path[1].id.split('')[1];
    idY = +event.path[0].id.split('')[1];    
    clickOnField(idX, idY);
}

function createArea(x, y, bombs) {
    for (let i = 0; i < x; i++) {
        const lineX = [];
        const elemX = document.createElement('div');
        sapper.appendChild(elemX).setAttribute('id', `x${  i}`);

        for (let j = 0; j < y; j++) {
            lineX.push({
                name: j,
                isBomb: false
            });
            const elemY = document.createElement('div');
            elemX.appendChild(elemY).setAttribute('id', `${i}${  j}`);
        }
        area.push(lineX);
    }
    area = renderBombs(bombs);
}

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

sapper.addEventListener('click', checkIsBombs);
createArea(10, 10, 10);