import Phaser from 'phaser'

import Gamescene from './scenes/game'

const config = {
	type: Phaser.AUTO,
	width: 500,
	height: 350,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [Gamescene],
	scale: { zoom: 2 }
}

export default new Phaser.Game(config)
