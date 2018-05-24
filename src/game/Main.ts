import 'p2';
import * as Phaser from 'phaser-ce';
import 'pixi';

import Boot from './states/Boot';
import Game from './states/Game';
import Menu from './states/Menu';
import Preloader from './states/Preloader';

export default class Main extends Phaser.Game {
  constructor() {
    super(144, 256, Phaser.AUTO, 'game', null, true);

    this.state.add('boot', new Boot());
    this.state.add('preloader', new Preloader());
    this.state.add('menu', new Menu());
    this.state.add('game', new Game());

    this.state.start('boot');
  }
}
