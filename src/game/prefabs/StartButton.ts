import * as Phaser from 'phaser-ce';

import Util from '../Util';

export default class StartButton extends Phaser.Button {
  constructor(
    game: Phaser.Game,
    x: number,
    y: number,
    // tslint:disable-next-line:ban-types
    callback: Function,
    callbackContext?: any,
    overFrame?: string | number,
    outFrame?: string | number,
    downFrame?: string | number,
    upFrame?: string | number
  ) {
    // callback decorator
    const swooshing = game.add.audio('swooshing');
    const decorator = () => {
      swooshing.play();
      const tween = game.add
        .tween(this)
        .to(
          { y: y + 5 },
          100,
          (Phaser.Easing.Default as any).In,
          true,
          0,
          0,
          true
        );
      tween.onComplete.add(callback, callbackContext);
    };

    super(
      game,
      x,
      y,
      'start',
      decorator,
      callbackContext,
      overFrame,
      outFrame,
      downFrame,
      upFrame
    );

    // this.x ? 0 : Util.hcenter(this, game.world);
    Util.hcenter(this, game.world);
  }
}
