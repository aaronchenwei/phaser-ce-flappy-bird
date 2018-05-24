import * as Phaser from 'phaser-ce';

import Util from '../Util';
import StartButton from './StartButton';

export default class MainMenu extends Phaser.Group {
  public title: any;
  public start: StartButton;

  constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
    super(game, parent, 'main menu', false, false);

    // const add = game.add;
    const world = game.world;

    this.title = this.create(0, 0, 'title');
    Util.hcenter(this.title, world);
    this.title.y = 50;

    this.start = new StartButton(game, 0, 180, this.onStartGame, this);

    // this.swooshing = add.audio('swooshing');

    this.addMultiple([this.title, this.start], true);
  }

  public onStartGame() {
    // this.swooshing.play();
    const tween = this.game.add
      .tween(this.game.world)
      .to({ alpha: 0 }, 200, (Phaser.Easing.Default as any).In, true);

    tween.onComplete.add(() => {
      this.game.state.start('game');
    });
  }
}
