import * as Phaser from 'phaser-ce';

import Util from '../Util';

export default class Ready extends Phaser.Group {
  // tslint:disable-next-line:variable-name
  public _ready: any;
  // tslint:disable-next-line:variable-name
  public _tap: any;

  constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer) {
    super(game, parent);

    this._ready = this.create(0, 0, 'ready');
    this._tap = this.create(0, 50, 'tap');
    Util.hcenter(this._tap, this);
    Util.center(this, parent);
  }

  public hide() {
    this.visible = false;
  }

  public show() {
    this.visible = true;
  }
}
