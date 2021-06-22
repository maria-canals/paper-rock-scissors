const allButtons = document.querySelectorAll('button');
const resetButton = document.getElementById('reset-button');
const userCounter = document.querySelector('.user-counter');
const finalResult = document.querySelector('.final-result');
const modal = document.querySelector('.modal-content');
const modalUsersChoice = document.querySelector('.modal-userschoice');
const modalComputersChoice = document.querySelector('.modal-coputerschoice');
const modalWinner = document.querySelector('.modal-winner');
const backdrop = document.getElementById('backdrop');

const PAPER = 'PAPER';
const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';

const WINNER_TIE = 'TIE';
const WINNER_USER = 'USER';
const WINNER_COMPUTER = 'COMPUTER';

let USERSPOINTS = 0;
let COMPUTERSPOINTS = 0;

const END_GAME = 'END OF THE GAME';

let startGame = true;

getUsersChoice = choice => {
	return choice;
};

getComputerChoice = () => {
	randomIndex = Math.random().toFixed(2);
	if (randomIndex <= 0.33) {
		return PAPER;
	} else if ((randomIndex > 0.33) & (randomIndex <= 0.66)) {
		return ROCK;
	} else if (randomIndex > 0.66) {
		return SCISSORS;
	}
};

getWinner = (uChoice, cChoice) => {
	if (uChoice === cChoice) {
		return WINNER_TIE;
	} else if (
		(uChoice === ROCK && cChoice === SCISSORS) ||
		(uChoice === PAPER && cChoice === ROCK) ||
		(uChoice === SCISSORS && cChoice === PAPER)
	) {
		return WINNER_USER;
	} else {
		return WINNER_COMPUTER;
	}
};

logPoints = winner => {
	if (
		(USERSPOINTS === 3 && COMPUTERSPOINTS < 3) ||
		(COMPUTERSPOINTS === 3 && USERSPOINTS < 3)
	) {
		return;
	} else if (winner === WINNER_TIE) {
		return WINNER_TIE;
	} else if (winner === WINNER_USER) {
		USERSPOINTS++;
		userCounter.textContent = USERSPOINTS;
		return USERSPOINTS;
	} else {
		COMPUTERSPOINTS++;
		return COMPUTERSPOINTS;
	}
};

getFinalWinner = () => {
	if (USERSPOINTS === 3 && COMPUTERSPOINTS < 3) {
		startGame = false;
		resetButton.classList.replace('disable-button', 'enable-button');
		finalResult.textContent = 'YOU WON';
		return;
	} else if (COMPUTERSPOINTS === 3 && USERSPOINTS < 3) {
		startGame = false;
		resetButton.classList.replace('disable-button', 'enable-button');
		finalResult.textContent = 'COMPUTER WON';
		return;
	}
};

toggleBackdrop = () => {
	backdrop.classList.toggle('visible');
};

allButtons.forEach(button =>
	button.addEventListener('click', function () {
		if (!startGame) {
			return;
		}

		const choice = this.id.toUpperCase();
		const usersChoice = getUsersChoice(choice);
		const computersChoice = getComputerChoice();

		const winner = getWinner(usersChoice, computersChoice);
		const roundWinner = logPoints(winner);

		modal.classList.replace('disable-modal', 'enable-modal');
		toggleBackdrop();
		modalUsersChoice.textContent = `YOU PICKED: ${usersChoice}`;
		modalComputersChoice.textContent = `THE HOUSE PICKED: ${computersChoice}`;
		modalWinner.textContent = `The winner is ${winner}`;

		setTimeout(() => {
			modal.classList.replace('enable-modal', 'disable-modal'),
				toggleBackdrop();
		}, 4000);

		console.log(USERSPOINTS, 'users points');
		console.log(COMPUTERSPOINTS, 'computers points');
		console.log(roundWinner, 'round winner points');

		const finalWinner = getFinalWinner();
		console.log(finalWinner, 'final winner');
	})
);

resetButton.addEventListener('click', () => {
	startGame = true;
	resetButton.classList.replace('enable-button', 'disable-button');
	USERSPOINTS = 0;
	COMPUTERSPOINTS = 0;
	finalResult.textContent = '';
	userCounter.textContent = USERSPOINTS;
});
