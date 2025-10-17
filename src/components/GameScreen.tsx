import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Flame } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface GameScreenProps {
  onGameOver: (streak: number) => void;
  currentStreak: number;
  onStreakUpdate: (streak: number) => void;
}

const FOOD_OPTIONS = [
  "biryani",
  "burger",
  "butter-chicken",
  "dessert",
  "dosa",
  "idly",
  "pasta",
  "pizza",
  "rice",
  "samosa",
];

interface FoodData {
  image: string;
}

const GameScreen = ({ onGameOver, currentStreak, onStreakUpdate }: GameScreenProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const fetchNewFood = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    try {
      const response = await fetch("https://foodish-api.com/api/");
      const data: FoodData = await response.json();
      setImageUrl(data.image);
      
      // Extract the food category from the URL
      // Example: "https://foodish-api.com/images/rice/rice35.jpg" -> "rice"
      const urlParts = data.image.split("/");
      const category = urlParts[urlParts.length - 2];
      setCorrectAnswer(category);
    } catch (error) {
      toast({
        title: "Error loading image",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewFood();
  }, []);

  const handleAnswer = (answer: string) => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    setSelectedAnswer(answer);

    setTimeout(() => {
      if (answer === correctAnswer) {
        const newStreak = currentStreak + 1;
        onStreakUpdate(newStreak);
        toast({
          title: "Correct! 🎉",
          description: `Streak: ${newStreak}`,
        });
        fetchNewFood();
      } else {
        toast({
          title: "Wrong answer! 😢",
          description: `The correct answer was: ${correctAnswer}`,
          variant: "destructive",
        });
        setTimeout(() => {
          onGameOver(currentStreak);
        }, 1500);
      }
      setIsAnswering(false);
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-6xl w-full space-y-6">
        {/* Streak Counter */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Flame className="w-8 h-8 text-primary" />
          <p className="text-4xl font-bold text-primary">{currentStreak}</p>
          <p className="text-muted-foreground text-xl">streak</p>
        </div>

        {/* Food Image */}
        <div className="bg-card border border-border rounded-lg p-4 mb-8">
          <img
            src={imageUrl}
            alt="Mystery food"
            className="w-full max-w-2xl mx-auto rounded-lg object-cover aspect-video"
          />
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {FOOD_OPTIONS.map((option) => (
            <Button
              key={option}
              variant="game"
              size="lg"
              onClick={() => handleAnswer(option)}
              disabled={isAnswering}
              className={`capitalize text-base ${
                selectedAnswer === option
                  ? option === correctAnswer
                    ? "bg-green-600 border-green-600 hover:bg-green-600"
                    : "bg-destructive border-destructive hover:bg-destructive"
                  : ""
              }`}
            >
              {option.replace("-", " ")}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
