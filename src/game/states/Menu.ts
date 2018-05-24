import * as Phaser from 'phaser-ce';

import Bird from '../prefabs/Bird';
import Ground from '../prefabs/Ground';
import MainMenu from '../prefabs/MainMenu';
import Util from '../Util';

export default class Menu extends Phaser.State {
  public background: Phaser.Sprite | null;
  public ground: Ground | null;
  public mainMenu: MainMenu | null;
  public title: any;
  public bird: any;

  constructor() {
    super();

    this.background = null;
    this.ground = null;
    this.mainMenu = null;
    this.title = null;
  }

  public init() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
  }

  public create() {
    const add = this.game.add;
    const world = this.game.world;
    const game = this.game;

    this.background = add.sprite(0, 0, 'day');

    this.ground = new Ground(game);
    add.existing(this.ground);

    this.mainMenu = new MainMenu(game, world);

    this.bird = new Bird(game, 0, 0, 'bird');
    add.existing(this.bird);
    Util.hcenter(this.bird, world);
  }
}
