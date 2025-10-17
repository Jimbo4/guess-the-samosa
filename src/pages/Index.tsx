import { useState, useEffect } from "react";
import MainMenu from "@/components/MainMenu";
import GameScreen from "@/components/GameScreen";
import RecapScreen from "@/components/RecapScreen";

type GameState = "menu" | "playing" | "recap";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);
  const [lastGameStreak, setLastGameStreak] = useState(0);

  // Load personal best from localStorage on mount
  useEffect(() => {
    const savedBest = localStorage.getItem("whosThatSamosaBest");
    if (savedBest) {
      setPersonalBest(parseInt(savedBest, 10));
    }
  }, []);

  const handleStartGame = () => {
    setCurrentStreak(0);
    setGameState("playing");
  };

  const handleGameOver = (streak: number) => {
    setLastGameStreak(streak);
    
    // Update personal best if needed
    if (streak > personalBest) {
      setPersonalBest(streak);
      localStorage.setItem("whosThatSamosaBest", streak.toString());
    }
    
    setGameState("recap");
  };

  const handlePlayAgain = () => {
    setCurrentStreak(0);
    setGameState("playing");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
  };

  const handleStreakUpdate = (streak: number) => {
    setCurrentStreak(streak);
  };

  return (
    <div className="bg-background min-h-screen">
      {gameState === "menu" && (
        <MainMenu onStartGame={handleStartGame} personalBest={personalBest} />
      )}
      
      {gameState === "playing" && (
        <GameScreen
          onGameOver={handleGameOver}
          currentStreak={currentStreak}
          onStreakUpdate={handleStreakUpdate}
        />
      )}
      
      {gameState === "recap" && (
        <RecapScreen
          streak={lastGameStreak}
          personalBest={personalBest}
          isNewRecord={lastGameStreak === personalBest && lastGameStreak > 0}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default Index;
