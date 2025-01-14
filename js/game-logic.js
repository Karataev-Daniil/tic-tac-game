document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');
    const container = document.getElementById('animation-container');
    
    if (!board || !status || !restartButton || !container) return;
    
    let currentPlayer = 'X';

    function createCells() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            board.appendChild(cell);
        }
    }

    function toggleRestartButton(visible) {
        restartButton.style.opacity = visible ? 1 : 0;
        restartButton.style.visibility = visible ? 'visible' : 'hidden';
    }

    function handleCellClick(e) {
        if (e.target.classList.contains('cell') && !e.target.textContent) {
            e.target.textContent = currentPlayer;
            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} Wins!`;
                status.classList.add(currentPlayer === 'X' ? 'win-x' : 'win-o');
                board.classList.add('win');
                board.removeEventListener('click', handleCellClick);
                toggleRestartButton(true);

                createConfetti();
            } else if ([...document.querySelectorAll('.cell')].every(cell => cell.textContent)) {
                status.textContent = 'It\'s a Draw!';
                status.classList.add('draw');
                board.classList.add('draw');
                toggleRestartButton(true);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Player ${currentPlayer}'s Turn`;
            }
        }
    }

    function checkWin() {
        const cells = [...document.querySelectorAll('.cell')];
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return wins.some(win => {
            const [a, b, c] = win;
            return cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent;
        });
    }

    function createConfetti() {
        const numConfetti = 200;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.left = `${Math.random() * 100}vw`;

            confetti.style.top = `-${parseInt(confetti.style.height, 10)}px`;
    
            const duration = Math.random() * 3 + 2; 
            const delay = Math.random() * 2;
            confetti.style.setProperty('--animation-duration', `${duration}s`);
            confetti.style.animationDelay = `${delay}s`;
    
            container.appendChild(confetti);
        }
    
        setTimeout(() => {
            const confettiElements = document.querySelectorAll('.confetti');
            confettiElements.forEach(confetti => confetti.remove());
        }, 5000);
    }

    function restartGame() {
        createCells();
        board.classList.remove('win', 'draw');
        status.textContent = `Player X's Turn`;
        status.classList.remove('win-x', 'win-o', 'draw');
        currentPlayer = 'X';

        toggleRestartButton(false);
        container.innerHTML = '';

        const numSymbols = 150;
        for (let i = 0; i < numSymbols; i++) {
            const symbol = document.createElement('div');
            symbol.classList.add('symbol', Math.random() > 0.5 ? 'x' : 'o');
            symbol.textContent = Math.random() > 0.5 ? 'X' : 'O';

            symbol.style.fontSize = `${Math.random() * 3 + 1}em`;
            symbol.style.top = `${Math.random() * 100}vh`;
            symbol.style.left = `${Math.random() * 100}vw`;
            symbol.style.transform = `rotate(${Math.random() * 360}deg)`;
            symbol.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;

            container.appendChild(symbol);
        }

        board.addEventListener('click', handleCellClick);
    }

    restartButton.addEventListener('click', restartGame);

    createCells();
    restartGame();
});
