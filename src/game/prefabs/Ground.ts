import * as Phaser from 'phaser-ce';

export default class Ground extends Phaser.Sprite {
  constructor(game: Phaser.Game) {
    super(game, 0, 0, 'ground');

    this.game.physics.enable(this);
    this.y = game.world.height - this.height;
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.velocity.x = -100;
  }

  public stop() {
    this.body.velocity.x = 0;
  }

  public resetGround() {
    this.body.velocity.x = -60;
  }

  public update() {
    super.update();
    this.x = this.x <= this.game.world.width - this.width ? 0 : this.x;
  }
}
