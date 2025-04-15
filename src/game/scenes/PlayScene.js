import { BaseScene } from './BaseScene';

export class PlayScene extends BaseScene {
  constructor(config) {
    super('PlayScene', { ...config, canGoBack: true });
    this.player = null;
    this.cursors = null;
    this.enemies = null;
    this.score = 0;
    this.scoreText = null;
    this.level = 1;
    this.playerSpeed = 200;
  }

  init(data) {
    // Get the hero information passed from the HeroSelectionComponent
    this.selectedHero = data.hero || { id: 'knight', name: 'Pixel Knight' };
  }

  create() {
    super.create();
    
    // Initialize the player with the selected hero
    this.player = this.physics.add.sprite(
      this.screenCenter[0], 
      this.screenCenter[1], 
      this.selectedHero.id
    );
    this.player.setCollideWorldBounds(true);
    this.player.play(`${this.selectedHero.id}_idle`);
    
    // Setup keyboard inputs
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Create enemy group
    this.enemies = this.physics.add.group();
    
    // Add collision detection
    this.physics.add.collider(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);
    
    // Initialize UI elements
    this.scoreText = this.add.text(16, 16, 'Score: 0', { 
      fontSize: '18px', 
      fill: '#00ff00' 
    });
    
    // Start spawning enemies
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  update() {
    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else {
      this.player.setVelocityX(0);
    }
    
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.playerSpeed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
    } else {
      this.player.setVelocityY(0);
    }
  }

  spawnEnemy() {
    // Randomly spawn enemies outside the visible area
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;
    
    switch(side) {
      case 0: // top
        x = Math.random() * this.config.width;
        y = -20;
        break;
      case 1: // right
        x = this.config.width + 20;
        y = Math.random() * this.config.height;
        break;
      case 2: // bottom
        x = Math.random() * this.config.width;
        y = this.config.height + 20;
        break;
      case 3: // left
        x = -20;
        y = Math.random() * this.config.height;
        break;
    }
    
    const enemy = this.enemies.create(x, y, 'enemy');
    
    // Make the enemy move toward the player
    this.physics.moveToObject(enemy, this.player, 100);
  }

  handlePlayerEnemyCollision(player, enemy) {
    // Implement collision logic
    enemy.destroy();
    
    // Update score
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}