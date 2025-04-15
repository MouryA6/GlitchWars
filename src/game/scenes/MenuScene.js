import { BaseScene } from './BaseScene';

export class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'OptionsScene', text: 'Options' },
      { scene: 'CreditsScene', text: 'Credits' }
    ];
  }

  create() {
    super.create();
    
    // Add title
    const title = this.add.text(this.screenCenter[0], this.screenCenter[1] - 100, 'GLITCH WARS', { 
      font: '48px "Press Start 2P"',
      fill: '#00ff00',
      stroke: '#000000',
      strokeThickness: 6,
      shadow: { offsetX: 2, offsetY: 2, color: '#0ff', blur: 8, stroke: true, fill: true }
    }).setOrigin(0.5);
    
    // Apply glitch effect to title
    this.createGlitchEffect(title);
    
    // Create menu items
    this.createMenu(this.menu, (menuItem) => {
      const textGO = menuItem.textObject;
      textGO.setInteractive({ useHandCursor: true });
      
      textGO.on('pointerover', () => {
        textGO.setStyle({ fill: '#ff00ff' });
      });
      
      textGO.on('pointerout', () => {
        textGO.setStyle({ fill: '#00ff00' });
      });
      
      textGO.on('pointerup', () => {
        this.scene.start(menuItem.scene);
      });
    });
  }
}