import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import GameLogo from "./GameLogo";

interface MainMenuProps {
  onStartGame: () => void;
  personalBest: number;
}

const MainMenu = ({ onStartGame, personalBest }: MainMenuProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <GameLogo />
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Personal Best</h2>
          </div>
          <p className="text-5xl font-bold text-primary">{personalBest}</p>
          <p className="text-muted-foreground mt-1">correct guesses in a row</p>
        </div>

        <Button 
          onClick={onStartGame} 
          size="lg" 
          className="text-xl py-6 px-12 w-full md:w-auto"
        >
          New Game
        </Button>
      </div>
    </div>
  );
};

export default MainMenu;
