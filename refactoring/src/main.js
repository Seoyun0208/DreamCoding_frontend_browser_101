"use strict";

import PopUp from "./popup.js"; // 확장자명 필수!
import Field from "./field.js";
import * as Sound from "./sound.js";

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector(".game__button");
const timerIndicator = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
	startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
	if (!started) {
		return;
	}
	if (item === "carrot") {
		score++;
		updateScoreBoard();
		if (score === CARROT_COUNT) {
			finishGame(true);
		}
	} else if (item === "bug") {
		finishGame(false);
	}
}

gameBtn.addEventListener("click", () => {
	if (started) {
		stopGame();
	} else {
		startGame();
	}
});

function startGame() {
	started = true;
	initGame();
	showStopButton();
	showTimerAndScore();
	startGameTimer();
	Sound.playBg();
}

function stopGame() {
	started = false;
	stopGameTimer();
	hideGameButton();
	gameFinishBanner.showWithText("REPLAY❓");
	Sound.playAlert();
	Sound.stopBg();
}

function finishGame(win) {
	started = false;
	hideGameButton();
	if (win) {
		Sound.playWin();
	} else {
		Sound.playBug();
	}
	stopGameTimer();
	Sound.stopBg();
	gameFinishBanner.showWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
}

function showStopButton() {
	const icon = gameBtn.querySelector(".fas");
	icon.classList.add("fa-stop");
	icon.classList.remove("fa-play");
	gameBtn.style.visibility = "visible";
}

function hideGameButton() {
	gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
	timerIndicator.style.visibility = "visible";
	gameScore.style.visibility = "visible";
}

function startGameTimer() {
	let remainingTimeSec = GAME_DURATION_SEC;
	updateTimerText(remainingTimeSec);
	timer = setInterval(() => {
		if (remainingTimeSec <= 0) {
			clearInterval(timer);
			finishGame(score === CARROT_COUNT);
			return;
		}
		updateTimerText(--remainingTimeSec);
	}, 1000);
}

function stopGameTimer() {
	clearInterval(timer);
}

function updateTimerText(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	timerIndicator.innerHTML = `${minutes}:${seconds}`;
}

function initGame() {
	score = 0;
	// 벌레와 당근을 생성한뒤 field에 추가해줌
	gameField.init();
}

function updateScoreBoard() {
	gameScore.innerText = CARROT_COUNT - score;
}
