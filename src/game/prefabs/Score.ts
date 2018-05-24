import * as Phaser from 'phaser-ce';

export default class Score extends Phaser.Group {
  // tslint:disable-next-line:variable-name
  public _score: number;
  // tslint:disable-next-line:variable-name
  public _type: string;

  constructor(
    game: Phaser.Game,
    type: string,
    parent: PIXI.DisplayObjectContainer,
    name?: string | undefined
  ) {
    type = type || '';
    super(game, parent, name, false, false);
    this._type = type;
    this._score = 0;
    this.parent = parent;
    this.create(0, 0, this._type + '0');
  }

  get score() {
    return this._score;
  }

  set score(score: number) {
    this._score = Math.round(score);
    const text = this._score.toString();
    this.removeAll();
    let x = 0;
    // let originWidth = this.width;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < text.length; i++) {
      x += this.create(x, 0, this._type + text[i]).width;
    }
  }

  public reset() {
    this.score = 0;
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }
}
