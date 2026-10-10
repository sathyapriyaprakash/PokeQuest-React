
import React from "react";

export default function TrainerProgress({ xp = 0, wins = 0, caughtCount = 0 }) {
  const level = Math.floor(xp / 100) + 1;
  const progress = xp % 100;

  return (
    <section className="trainer-strip">
      <div className="strip-icon">✦</div>

      <div className="strip-copy">
        <strong>TRAINER PROGRESS</strong>
        <span>
          {caughtCount} Pokémon caught · {wins} battles won
        </span>
      </div>

      <div className="xp-area">
        <div className="xp-label">
          <span>LEVEL {level}</span>
          <span>{progress}/100 XP</span>
        </div>

        <div className="xp-track">
          <div style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
