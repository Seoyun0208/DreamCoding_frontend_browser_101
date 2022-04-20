"use strict";

import Field from "./field.js";
import * as Sound from "./sound.js";

export default class GameBuilder {
	withGameDuration(duration) {
		this.gameDuration = duration;
		return this;
	}

	withCarrotCount(num) {
		this.carrotCount = num;
		return this;
	}

	withBugCount(num) {
		this.bugCount = num;
		return this;
	}

	build() {
		return new Game(
			this.gameDuration, //
			this.carrotCount, //
			this.bugCount //
		);
	}
}

class Game {
	constructor(carrotCount, bugCount, gameDuration) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.gameDuration = gameDuration;

		this.timerIndicator = document.querySelector(".game__timer");
		this.gameScore = document.querySelector(".game__score");
		this.gameBtn = document.querySelector(".game__button");

		this.gameBtn.addEventListener("click", () => {
			if (this.started) {
				this.stop();
			} else {
				this.start();
			}
		});

		this.gameField = new Field(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick);

		this.started = false;
		this.score = 0;
		this.timer = undefined;
	}

	setGameStopListener(onGameStop) {
		this.onGameStop = onGameStop;
	}

	start() {
		this.started = true;
		this.initGame();
		this.showStopButton();
		this.showTimerAndScore();
		this.startGameTimer();
		Sound.playBg();
	}

	stop() {
		this.started = false;
		this.stopGameTimer();
		this.hideGameButton();
		Sound.playAlert();
		Sound.stopBg();
		this.onGameStop && this.onGameStop("cancel");
	}

	finish(win) {
		this.started = false;
		this.hideGameButton();
		if (win) {
			Sound.playWin();
		} else {
			Sound.playBug();
		}
		this.stopGameTimer();
		Sound.stopBg();
		this.onGameStop && this.onGameStop(win ? "win" : "lose");
	}

	onItemClick = (item) => {
		if (!this.started) {
			return;
		}
		if (item === "carrot") {
			this.score++;
			this.updateScoreBoard();
			if (this.score === this.carrotCount) {
				this.finish(true);
			}
		} else if (item === "bug") {
			this.finish(false);
		}
	};

	showStopButton() {
		const icon = this.gameBtn.querySelector(".fas");
		icon.classList.add("fa-stop");
		icon.classList.remove("fa-play");
		this.gameBtn.style.visibility = "visible";
	}

	hideGameButton() {
		this.gameBtn.style.visibility = "hidden";
	}

	showTimerAndScore() {
		this.timerIndicator.style.visibility = "visible";
		this.gameScore.style.visibility = "visible";
	}

	startGameTimer() {
		let remainingTimeSec = this.gameDuration;
		this.updateTimerText(remainingTimeSec);
		this.timer = setInterval(() => {
			if (remainingTimeSec <= 0) {
				clearInterval(timer);
				this.finish(this.score === this.carrotCount);
				return;
			}
			this.updateTimerText(--remainingTimeSec);
		}, 1000);
	}

	stopGameTimer() {
		clearInterval(this.timer);
	}

	updateTimerText(time) {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
	}

	initGame() {
		this.score = 0;
		this.gameScore.innerText = this.carrotCount;
		this.gameField.init();
	}

	updateScoreBoard() {
		this.gameScore.innerText = this.carrotCount - this.score;
	}
}
