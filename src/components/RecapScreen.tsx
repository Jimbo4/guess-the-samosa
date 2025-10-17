import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Home } from "lucide-react";
import GameLogo from "./GameLogo";

interface RecapScreenProps {
  streak: number;
  personalBest: number;
  isNewRecord: boolean;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const RecapScreen = ({
  streak,
  personalBest,
  isNewRecord,
  onPlayAgain,
  onBackToMenu,
}: RecapScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <GameLogo />

        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          {isNewRecord && (
            <div className="bg-primary/10 border border-primary rounded-lg p-4">
              <p className="text-primary text-2xl font-bold">🎉 New Personal Best! 🎉</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold mb-2">Game Over!</h2>
            <p className="text-muted-foreground">You answered correctly:</p>
            <p className="text-6xl font-bold text-primary mt-4">{streak}</p>
            <p className="text-muted-foreground mt-2">
              {streak === 1 ? "time" : "times"} in a row
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-primary" />
              <p className="text-sm text-muted-foreground">Your Best</p>
            </div>
            <p className="text-3xl font-bold text-primary">{personalBest}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onPlayAgain} size="lg" className="gap-2">
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
          <Button onClick={onBackToMenu} variant="secondary" size="lg" className="gap-2">
            <Home className="w-5 h-5" />
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecapScreen;
