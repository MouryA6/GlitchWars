import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor(config) {
    super('BootScene');
    this.config = config;
  }

  preload() {
    // Create loading bar
    const width = this.config.width;
    const height = this.config.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);
    
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px "Press Start 2P"',
        fill: '#00ff00'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    // Loading event handlers
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });
    
    // Load all necessary game assets
    this.load.image('background', '/assets/background.png');
    
    // Hero character sprites
    this.load.spritesheet('knight', '/assets/swordsman.png', { 
      frameWidth: 32, frameHeight: 32 
    });
    this.load.spritesheet('mage', '/assets/wizard.png', { 
      frameWidth: 32, frameHeight: 32 
    });
    this.load.spritesheet('archer', '/assets/archer.png', { 
      frameWidth: 32, frameHeight: 32 
    });
    this.load.spritesheet('spearman', '/assets/spearman.png', { 
      frameWidth: 32, frameHeight: 32 
    });
    
    // Enemy sprites
    this.load.spritesheet('enemy', '/assets/enemy.png', {
      frameWidth: 32, frameHeight: 32
    });
    
    // UI elements
    this.load.image('button', '/assets/button.png');
  }

  create() {
    // Animation definitions for our sprites
    this.createAnimations();
    
    this.scene.start('MenuScene');
  }

  createAnimations() {
    // Knight animations
    this.anims.create({
      key: 'knight_idle',
      frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Similar animations for other characters and enemies
    // ...
    
    // Mage animations
    this.anims.create({
      key: 'mage_idle',
      frames: this.anims.generateFrameNumbers('mage', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Archer animations
    this.anims.create({
      key: 'archer_idle',
      frames: this.anims.generateFrameNumbers('archer', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });
  }
}