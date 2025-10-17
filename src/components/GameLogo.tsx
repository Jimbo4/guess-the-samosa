import { Utensils } from "lucide-react";

const GameLogo = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
        <Utensils className="w-20 h-20 text-primary relative" strokeWidth={2} />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-center">
        Who's that <span className="text-primary">Samosa</span>?
      </h1>
      <p className="text-muted-foreground text-lg">Test your Indian food knowledge!</p>
    </div>
  );
};

export default GameLogo;
