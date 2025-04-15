import Phaser from 'phaser';

export class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 32;
    this.lineHeight = 42;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: '#00ff00' };
  }

  create() {
    // Add common elements that all scenes might use
    this.add.image(0, 0, 'background').setOrigin(0);
    
    // Add scanlines effect
    this.scanlines = this.add.rectangle(0, 0, this.config.width, this.config.height, 0x000000, 0.2);
    this.scanlines.setOrigin(0, 0);
    this.scanlines.setBlendMode(Phaser.BlendModes.OVERLAY);
    
    if (this.config.canGoBack) {
      const backButton = this.add.text(this.config.width - 10, 10, 'BACK', { 
        fontSize: '16px', 
        fill: '#00ff00',
        padding: { x: 10, y: 5 }
      })
      .setOrigin(1, 0)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => backButton.setStyle({ fill: '#ff00ff' }))
      .on('pointerout', () => backButton.setStyle({ fill: '#00ff00' }))
      .on('pointerdown', () => this.scene.start('MenuScene'));
    }
  }

  createGlitchEffect(target) {
    this.time.addEvent({
      delay: 300,
      loop: true,
      callback: () => {
        if (Math.random() > 0.7) {
          const originalPosition = { x: target.x, y: target.y };
          // Apply glitch effect
          target.setPosition(
            originalPosition.x + (Math.random() * 10 - 5),
            originalPosition.y + (Math.random() * 6 - 3)
          );
          target.setTint(
            Math.random() > 0.5 ? 0x00ffff : 0xff00ff
          );
          
          // Reset after a short time
          this.time.delayedCall(50, () => {
            target.setPosition(originalPosition.x, originalPosition.y);
            target.setTint(0xffffff);
          });
        }
      }
    });
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    
    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textObject = this.add.text(
        menuPosition[0], 
        menuPosition[1], 
        menuItem.text,
        this.fontOptions
      ).setOrigin(0.5, 1);
      
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}