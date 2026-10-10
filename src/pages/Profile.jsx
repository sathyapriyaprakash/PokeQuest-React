import React from "react";
import TrainerProgress from "../components/TrainerProgress";

function Profile({
  trainerName = "Pokémon Trainer",
  xp = 0,
  wins = 0,
  caught = [],
  team = [],
}) {
  const caughtCount = caught.length;
  const teamCount = team.length;

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">TRAINER DASHBOARD</p>
        <h1>Trainer Profile</h1>
        <p>Track your progress and celebrate your Pokémon journey.</p>
      </section>

      <section className="profile-hero">
        <div className="profile-avatar">⚡</div>

        <div className="profile-details">
          <p className="eyebrow">WELCOME BACK, TRAINER</p>
          <h2>{trainerName}</h2>
          <p>Keep exploring, catching and training Pokémon!</p>
        </div>
      </section>

      <section className="profile-stats">
        <div className="profile-stat-card">
          <span>Pokémon Caught</span>
          <strong>{caughtCount}</strong>
        </div>

        <div className="profile-stat-card">
          <span>Battle Wins</span>
          <strong>{wins}</strong>
        </div>

        <div className="profile-stat-card">
          <span>Total XP</span>
          <strong>{xp}</strong>
        </div>

        <div className="profile-stat-card">
          <span>Team Size</span>
          <strong>{teamCount}/3</strong>
        </div>
      </section>

      <section className="profile-progress">
        <h2>Trainer Progress</h2>

        <TrainerProgress
          xp={xp}
          wins={wins}
          caughtCount={caughtCount}
        />
      </section>

      <section className="profile-tips">
        <h2>Next Steps</h2>

        <div className="profile-tip">
          <span>🔎</span>
          <div>
            <h3>Explore Pokémon</h3>
            <p>Discover new Pokémon and expand your collection.</p>
            <a href="/explore">Explore Now →</a>
          </div>
        </div>

        <div className="profile-tip">
          <span>⚔️</span>
          <div>
            <h3>Build Your Team</h3>
            <p>Choose up to three Pokémon for your battle team.</p>
            <a href="/team">Build Team →</a>
          </div>
        </div>

        <div className="profile-tip">
          <span>🧠</span>
          <div>
            <h3>Test Your Knowledge</h3>
            <p>Take the quiz and improve your Pokémon knowledge.</p>
            <a href="/quiz">Start Quiz →</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
