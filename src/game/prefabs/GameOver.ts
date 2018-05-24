import * as Phaser from 'phaser-ce';

import Util from '../Util';
import Board from './Board';
import StartButton from './StartButton';

export default class GameOver extends Phaser.Group {
  public over: any;
  public board: Board;
  public restart: StartButton;
  public swooshing: Phaser.Sound;
  public tmpScore: number;

  constructor(
    game: Phaser.Game,
    parent: PIXI.DisplayObjectContainer,
    // tslint:disable-next-line:ban-types
    callback: Function,
    callbackContext: any
  ) {
    super(game, parent);

    const world = game.world;
    const add = game.add;

    this.over = add.sprite(0, 0, 'over');
    this.board = new Board(game, this);
    this.board.y = 40;
    this.restart = new StartButton(game, 0, 120, callback, callbackContext);
    this.swooshing = add.audio('swooshing');
    this.tmpScore = 0;

    this.addMultiple([this.over, this.board, this.restart]);

    this.forEach((obj: any) => Util.hcenter(obj, this));

    Util.center(this, world);

    this.hide();
  }

  public hide() {
    this.visible = false;
    this.setAll('alpha', 0);
  }

  public setScore(score: number) {
    this.board.setScore(score);
  }

  public show() {
    const add = this.game.add;

    this.visible = true;
    let originY = this.over.y;
    this.over.y -= 10;
    const originScore = this.board.score.score;
    const updateBest = this.board.best.score < this.board.score.score;
    this.board.score.x = 101 - this.board.score.width;
    if (updateBest) {
      this.board.best.x = this.board.score.x;
    }
    this.board.score.score = 0;

    // show game over first
    let tween = add.tween(this.over).to({ y: originY, alpha: 1 }, 300);

    tween.onComplete.add(() => {
      originY = this.board.y;
      this.board.y += 20;
      // when complete game over, delay 0.5s then show the board
      tween = add
        .tween(this.board)
        .to(
          { y: originY, alpha: 1 },
          300,
          (Phaser.Easing.Default as any).In,
          false,
          500
        );
      tween.onStart.add(() => this.swooshing.play());
      tween.onComplete.add(() => {
        // when complete board, tween the final score
        tween = add.tween(this.board.score).to({ score: originScore }, 200);
        if (updateBest) {
          tween.start(); // start the tween for score
          tween = add.tween(this.board.best).to({ score: originScore }, 200);
        }
        tween.onComplete.add(() => {
          // when tween the final score complete, delay .2s to show the restart button
          tween = add
            .tween(this.restart)
            .to(
              { alpha: 1 },
              200,
              (Phaser.Easing.Default as any).In,
              false,
              200
            ); // start the tween for restart button
          tween.start();
        });
        tween.start(); // start the tween for score/best
      });
      tween.start(); // start the tween for board
    });

    this.swooshing.play();
    tween.start(); // start the tween for game over text
  }
}
