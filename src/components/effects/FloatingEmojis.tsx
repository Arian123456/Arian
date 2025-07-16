import { useEffect, useState } from 'react';

const backgroundEmojis = ['📚', '✏️', '🎓', '📖', '🖊️', '📝', '🌟', '💡', '🎯', '🏆'];

interface FloatingEmoji {
  id: number;
  x: number;
  y: number;
  emoji: string;
  speed: number;
  direction: number;
}

export function FloatingEmojis() {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);

  useEffect(() => {
    // Initialize floating emojis
    const initialEmojis: FloatingEmoji[] = [];
    for (let i = 0; i < 6; i++) {
      initialEmojis.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: backgroundEmojis[Math.floor(Math.random() * backgroundEmojis.length)],
        speed: 0.5 + Math.random() * 1,
        direction: Math.random() * Math.PI * 2,
      });
    }
    setEmojis(initialEmojis);

    const interval = setInterval(() => {
      setEmojis(prev => 
        prev.map(emoji => ({
          ...emoji,
          x: (emoji.x + Math.cos(emoji.direction) * emoji.speed + window.innerWidth) % window.innerWidth,
          y: (emoji.y + Math.sin(emoji.direction) * emoji.speed + window.innerHeight) % window.innerHeight,
          direction: emoji.direction + (Math.random() - 0.5) * 0.1,
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 opacity-20">
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="absolute text-lg transition-all duration-300 ease-linear"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`,
          }}
        >
          {emoji.emoji}
        </div>
      ))}
    </div>
  );
}