import { useState, forwardRef } from "react";
import { Button, ButtonProps } from "./button";
import { FallingLeaves } from "../effects/FallingLeaves";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, onClick, className, ...props }, ref) => {
    const [triggerLeaves, setTriggerLeaves] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setTriggerLeaves(true);
      onClick?.(e);
    };

    const handleLeavesComplete = () => {
      setTriggerLeaves(false);
    };

    return (
      <>
        <Button
          ref={ref}
          onClick={handleClick}
          className={`transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
          {...props}
        >
          {children}
        </Button>
        <FallingLeaves trigger={triggerLeaves} onComplete={handleLeavesComplete} />
      </>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };