import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Phaser from 'phaser';
import { BootScene } from '../game/scenes/BootScene';
import { MenuScene } from '../game/scenes/MenuScene';
import { PlayScene } from '../game/scenes/PlayScene';

export function Game() {
  const gameContainerRef = useRef(null);
  const [gameLoaded, setGameLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const selectedHero = location.state?.hero;
  
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
      
      // Game configuration
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
        scene: [
          new BootScene({ width, height }),
          new MenuScene({ width, height }),
          new PlayScene({ width, height })
        ]
      };
      
      // Initialize the game
      game = new Phaser.Game(config);
      
      // Pass the selected hero to the PlayScene
      game.events.once('ready', () => {
        setIsLoading(false);
        setGameLoaded(true);
        
        // If a hero was selected, start the PlayScene directly
        if (selectedHero) {
          game.scene.start('PlayScene', { hero: selectedHero });
        }
      });
      
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
  }, [selectedHero]);
  
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 z-10 pointer-events-none" />
      
      {/* Glitch-style border */}
      <div className="relative w-full max-w-[1200px] h-[80vh] max-h-[900px] border-4 border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.5)]">
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-70">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-4 text-green-500 font-pixel">Loading Game...</span>
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
        <p>Use ARROW KEYS to move • Defeat enemies to earn points • Survive as long as possible</p>
      </div>
    </div>
  );
}