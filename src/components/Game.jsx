import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

export function Game() {
  const gameContainerRef = useRef(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let game = null;
    
    if (gameContainerRef.current) {
      // Update loading state
      setIsLoading(true);
      
      // Calculate responsive dimensions
      const updateGameSize = () => {
        const width = Math.min(window.innerWidth, 1200);
        const height = Math.min(window.innerHeight - 100, 900);
        
        if (game) {
          game.scale.resize(width, height);
        }
        return { width, height };
      };
      
      // Get initial size
      const { width, height } = updateGameSize();
      
      // Advanced Phaser configuration
      const config = {
        type: Phaser.AUTO,
        width,
        height,
        parent: gameContainerRef.current,
        backgroundColor: '#000000',
        pixelArt: true,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            debug: false
          }
        },
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: {
          preload: function() {
            // Create loading bar
            const progressBar = this.add.graphics();
            const progressBox = this.add.graphics();
            progressBox.fillStyle(0x222222, 0.8);
            progressBox.fillRect(width/2 - 160, height/2 - 25, 320, 50);
            
            const loadingText = this.make.text({
              x: width/2,
              y: height/2 - 50,
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
              progressBar.fillRect(width/2 - 150, height/2 - 15, 300 * value, 30);
            });
            
            this.load.on('complete', () => {
              progressBar.destroy();
              progressBox.destroy();
              loadingText.destroy();
              setIsLoading(false);
              setGameLoaded(true);
            });
            
            // We'll load assets here later
          },
          create: function() {
            // Create a glitchy title effect
            const title = this.add.text(width/2, height/2, 'GLITCHWARS', { 
              font: '48px "Press Start 2P"',
              fill: '#00ff00',
              stroke: '#000000',
              strokeThickness: 6,
              shadow: { offsetX: 2, offsetY: 2, color: '#0ff', blur: 8, stroke: true, fill: true }
            }).setOrigin(0.5);
            
            // Add a glitch effect
            this.time.addEvent({
              delay: 300,
              loop: true,
              callback: () => {
                if (Math.random() > 0.7) {
                  title.setPosition(
                    width/2 + (Math.random() * 10 - 5),
                    height/2 + (Math.random() * 6 - 3)
                  );
                  title.setTint(
                    Math.random() > 0.5 ? 0x00ffff : 0xff00ff
                  );
                  
                  // Reset after a short time
                  this.time.delayedCall(50, () => {
                    title.setPosition(width/2, height/2);
                    title.setTint(0xffffff);
                  });
                }
              }
            });
            
            // Add animated scanlines effect to the whole scene
            const scanlines = this.add.rectangle(0, 0, width, height, 0x000000, 0.2);
            scanlines.setOrigin(0, 0);
            scanlines.setBlendMode(Phaser.BlendModes.OVERLAY);
            
            // Add click to start prompt
            const startPrompt = this.add.text(width/2, height/2 + 100, 'Click to Start', { 
              font: '16px "Press Start 2P"',
              fill: '#ffffff'
            }).setOrigin(0.5);
            
            // Make it blink
            this.tweens.add({
              targets: startPrompt,
              alpha: 0,
              duration: 500,
              ease: 'Power2',
              yoyo: true,
              repeat: -1
            });
            
            // Make the entire scene clickable to proceed
            this.input.on('pointerdown', () => {
              // Here we would transition to the actual game
              startPrompt.setText('Game starting...');
              startPrompt.setAlpha(1);
              this.tweens.killTweensOf(startPrompt);
              
              // We'll add scene transition here in future steps
            });
          },
          update: function() {
            // Game loop updates will go here
          }
        }
      };
      
      // Initialize the game
      game = new Phaser.Game(config);
      
      // Handle window resizing
      const resizeListener = () => {
        updateGameSize();
      };
      
      window.addEventListener('resize', resizeListener);
      
      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', resizeListener);
        if (game) {
          game.destroy(true);
        }
      };
    }
  }, []);
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-10 pointer-events-none" />
      
      {/* Glitch-style border */}
      <div className="relative w-full max-w-[1200px] h-[80vh] max-h-[900px] border-4 border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {/* Game container */}
        <div 
          ref={gameContainerRef} 
          className="w-full h-full bg-black"
        />
      </div>
      
      {/* Game controls info */}
      <div className="text-green-400 text-xs md:text-sm mt-4 max-w-md text-center font-pixel">
        <p>Press WASD to move • Choose your character • Survive the waves</p>
      </div>
    </div>
  );
}