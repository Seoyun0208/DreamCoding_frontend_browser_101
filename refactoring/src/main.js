"use strict";

import PopUp from "./popup.js"; // 확장자명 필수!
import Game from "./game.js";

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameFinishBanner = new PopUp();

const game = new Game(3, 20, 20);
game.setGameStopListener((reason) => {
	let message;
	switch (reason) {
		case "cancel":
			message = "REPLAY❓";
			break;
		case "win":
			message = "YOU WON 🎉";
			break;
		case "lose":
			message = "YOU LOST 💩";
			break;
		default:
			throw new Error("not valid reason");
	}
	gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
	game.start();
});
