const cardArray = [
  { name: 'sol', symbol: '☀️' },
  { name: 'sol', symbol: '☀️' },
  { name: 'lua', symbol: '🌙' },
  { name: 'lua', symbol: '🌙' },
  { name: 'estrela', symbol: '⭐' },
  { name: 'estrela', symbol: '⭐' },
  { name: 'nuvem', symbol: '☁️' },
  { name: 'nuvem', symbol: '☁️' },
  { name: 'flor', symbol: '🌸' },
  { name: 'flor', symbol: '🌸' },
  { name: 'arvore', symbol: '🌳' },
  { name: 'arvore', symbol: '🌳' },
  { name: 'coracao', symbol: '❤️' },
  { name: 'coracao', symbol: '❤️' }
];

const grid = document.getElementById('grid');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let cardsChosen = [];
let cardsChosenId = [];
let cardsWon = [];

function shuffleCards() {
  return cardArray.sort(() => Math.random() - 0.5);
}

function createBoard() {
  grid.innerHTML = '';
  shuffleCards().forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = index;

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = card.symbol;

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = '❓';

    cardElement.append(front, back);
    cardElement.addEventListener('click', flipCard);

    grid.appendChild(cardElement);
  });

  // Esconde os símbolos no início
  document.querySelectorAll('.front').forEach(front => front.style.visibility = 'hidden');
}

function flipCard() {
  const id = this.dataset.id;
  if (cardsChosenId.includes(id) || cardsChosen.length === 2) return;

  cardsChosen.push(cardArray[id].name);
  cardsChosenId.push(id);

  this.classList.add('flip');
  this.querySelector('.front').style.visibility = 'visible';

  if (cardsChosen.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}

function checkForMatch() {
  const cards = document.querySelectorAll('.card');
  const [firstId, secondId] = cardsChosenId;

  if (cardsChosen[0] === cardsChosen[1]) {
    cards[firstId].removeEventListener('click', flipCard);
    cards[secondId].removeEventListener('click', flipCard);
    cardsWon.push(cardsChosen);
  } else {
    cards[firstId].classList.remove('flip');
    cards[secondId].classList.remove('flip');
    cards[firstId].querySelector('.front').style.visibility = 'hidden';
    cards[secondId].querySelector('.front').style.visibility = 'hidden';
  }

  cardsChosen = [];
  cardsChosenId = [];

  if (cardsWon.length === cardArray.length / 2) {
    statusText.textContent = '🎉 Parabéns! Todos os pares encontrados!';
  }
}

restartBtn.addEventListener('click', () => {
  cardsWon = [];
  cardsChosen = [];
  cardsChosenId = [];
  statusText.textContent = 'Encontre todos os pares!';
  createBoard();
});

createBoard();
