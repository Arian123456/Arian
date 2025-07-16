import { useEffect, useState } from 'react';

const leafEmojis = ['🍃', '🌿', '🍀', '🌱', '🍂', '🌾'];

interface Leaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  emoji: string;
  speed: number;
  drift: number;
}

interface FallingLeavesProps {
  trigger: boolean;
  onComplete: () => void;
}

export function FallingLeaves({ trigger, onComplete }: FallingLeavesProps) {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newLeaves: Leaf[] = [];
    for (let i = 0; i < 8; i++) {
      newLeaves.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        emoji: leafEmojis[Math.floor(Math.random() * leafEmojis.length)],
        speed: 2 + Math.random() * 3,
        drift: (Math.random() - 0.5) * 2,
      });
    }

    setLeaves(newLeaves);

    const interval = setInterval(() => {
      setLeaves(prev => {
        const updated = prev.map(leaf => ({
          ...leaf,
          y: leaf.y + leaf.speed,
          x: leaf.x + leaf.drift,
          rotation: leaf.rotation + 2,
        })).filter(leaf => leaf.y < window.innerHeight + 50);

        if (updated.length === 0) {
          onComplete();
        }

        return updated;
      });
    }, 50);

    const timeout = setTimeout(() => {
      setLeaves([]);
      onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [trigger, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute text-2xl transition-all duration-100 ease-linear"
          style={{
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          {leaf.emoji}
        </div>
      ))}
    </div>
  );
}