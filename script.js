const container = document.getElementById('puzzle-container');
const resetBtn = document.getElementById('reset-btn');
const size = 3;
let tiles = [];

function initTiles() {
    tiles = Array.from({ length: size * size }, (_, i) => (i === size * size - 1 ? null : i + 1));
    shuffleTiles();
    createGrid();
}

function shuffleTiles() {
    // Fisher-Yates Shuffle Algorithm
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function createGrid() {
    container.innerHTML = '';
    tiles.forEach((tile, index) => {
        const div = document.createElement('div');
        div.classList.add('tile');
        if (tile !== null) {
            div.textContent = tile;
            div.addEventListener('click', () => moveTile(index));
        } else {
            div.classList.add('empty');
        }
        container.appendChild(div);
    });
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);
    if ((index === emptyIndex - 1 && index % size !== size - 1) || 
        (index === emptyIndex + 1 && emptyIndex % size !== size - 1) || 
        (index === emptyIndex - size) || 
        (index === emptyIndex + size)) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        createGrid();
    }
}

resetBtn.addEventListener('click', initTiles);
initTiles();