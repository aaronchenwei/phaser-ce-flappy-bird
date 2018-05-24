import Bird from '../prefabs/Bird';
import GameOver from '../prefabs/GameOver';
import Ground from '../prefabs/Ground';
import Pipe from '../prefabs/Pipe';
import Ready from '../prefabs/Ready';
import Score from '../prefabs/Score';

import Util from '../Util';

// const ANGLE = 30;
// const SPACE = 64;

export default class Game extends Phaser.State {
  public background: any;
  public ground: Ground;
  public bird: Bird;
  public pipes: any;
  public score: Score;
  public ready: Ready;
  public gameOver: GameOver;
  public timer: any;
  public audio: any;

  constructor() {
    super();

    // this.background = null;
    // this.ground = null;
    // this.bird = null;
    // this.pipes = null;
    // this.score = null;
    // this.ready = null;
    // this.gameOver = null;
    // this.timer = null;
    this.audio = {};
  }

  public init() {
    this.game.renderer.renderSession.roundPixels = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.game.physics.arcade.gravity.y = 800;

    this.game.add
      .tween(this.game.world)
      .to({ alpha: 1 }, 200, (Phaser.Easing.Default as any).In, true);
  }

  public create() {
    const game = this.game;
    const world = this.game.world;
    const add = this.game.add;

    // background
    this.background = add.sprite(0, 0, 'day');

    // audio
    ['point', 'hit', 'die', 'swooshing'].forEach(
      el => (this.audio[el] = add.audio(el))
    );

    // pipes
    this.pipes = add.physicsGroup();

    // ground
    this.ground = new Ground(game);
    add.existing(this.ground);

    // bird
    this.bird = new Bird(game, 30, 0, 'bird');
    add.existing(this.bird);

    // score
    this.score = new Score(game, '', world);
    this.score.y = 20;
    Util.hcenter(this.score, world);

    // ready
    this.ready = new Ready(game, world);

    // game over
    this.gameOver = new GameOver(game, world, this.onRestart, this);

    // mouse
    this.input.onTap.add(this.onTap, this);
  }

  public update() {
    this.pipes.forEachAlive((pipe: Pipe) => {
      if (
        this.game.physics.arcade.overlap(
          this.bird,
          pipe,
          this.hitPipe,
          undefined,
          this
        )
      ) {
        return;
      }
      this.passPipe(pipe);
    });

    this.game.physics.arcade.collide(
      this.bird,
      this.ground,
      this.hitGround,
      undefined,
      this
    );
  }

  public onTap() {
    if (this.ready.visible) {
      this.ready.hide();
      this.bird.start();

      // tslint:disable-next-line:no-unused-expression
      new Pipe(this.game, this.pipes);

      this.timer = this.time.events.loop(
        1500,
        () => new Pipe(this.game, this.pipes)
      );
    }

    this.bird.fly();
  }

  public onRestart() {
    // this.audio.swooshing.play();
    const add = this.game.add;
    const tween = add
      .tween(this.game.world)
      .to({ alpha: 0 }, 100, (Phaser.Easing.Default as any).In, true);

    tween.onComplete.add(() => {
      this.bird.resetBird();
      this.ground.resetGround();
      this.ready.show();
      this.gameOver.hide();
      this.score.score = 0;
      this.score.show();
      this.pipes.removeAll();
      this.game.add
        .tween(this.game.world)
        .to({ alpha: 1 }, 100, (Phaser.Easing.Default as any).In, true);
    });
  }

  public hitPipe() {
    if (this.bird.alive === false) {
      return;
    }

    this.shock();

    this.audio.hit.onStop.removeAll();
    this.audio.hit.onStop.add(() => this.audio.die.play());
    this.audio.hit.play();

    this.bird.die(this.onGameOver, this);

    this.game.time.events.remove(this.timer);

    this.pipes.forEachAlive((pipe: Pipe) => {
      pipe.stop();
    });
    this.ground.stop();
  }

  public hitGround() {
    if (this.bird.alive === false) {
      return;
    }

    this.shock();

    this.audio.hit.onStop.removeAll();
    this.audio.hit.play();

    // Set bird alive to false
    this.bird.alive = false;

    // remove the timer
    this.game.time.events.remove(this.timer);

    // stop moving the pipes and ground
    this.pipes.forEachAlive((pipe: Pipe) => {
      pipe.stop();
    });
    this.ground.stop();

    this.time.events.repeat(500, 0, () => {
      this.onGameOver();
    });
  }

  public shock() {
    this.game.camera.flash();
    this.game.camera.shake(0.02);
  }

  public onGameOver() {
    this.score.hide();
    this.gameOver.setScore(this.score.score);
    this.gameOver.show();
  }

  public passPipe(pipe: Pipe) {
    if (!pipe.pass) {
      if (this.bird.x - pipe.topPipe.x >= pipe.width) {
        pipe.pass = true;
        this.score.score++;
        Util.hcenter(this.score, this.game.world);
        this.audio.point.play();
      }
    }
  }
}
