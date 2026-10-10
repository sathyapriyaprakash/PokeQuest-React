import React, { useState } from "react";

function BattleArena({ team = [] }) {
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [battleLog, setBattleLog] = useState(
    "Choose your team and start the battle!"
  );
  const [battleStarted, setBattleStarted] = useState(false);
  const [winner, setWinner] = useState("");

  const player = team[0];

  function startBattle() {
    if (!player) {
      setBattleLog("First, add a Pokémon to your team in Team Builder.");
      return;
    }

    setPlayerHP(100);
    setOpponentHP(100);
    setWinner("");
    setBattleStarted(true);
    setBattleLog(`${player.name} entered the battle!`);
  }

  function attack() {
    if (!battleStarted || winner) return;

    const damage = Math.floor(Math.random() * 21) + 10;
    const newOpponentHP = Math.max(0, opponentHP - damage);

    setOpponentHP(newOpponentHP);

    if (newOpponentHP === 0) {
      setWinner("You Win!");
      setBattleLog(`${player.name} defeated the opponent!`);
      return;
    }

    const enemyDamage = Math.floor(Math.random() * 16) + 5;
    const newPlayerHP = Math.max(0, playerHP - enemyDamage);

    setPlayerHP(newPlayerHP);

    if (newPlayerHP === 0) {
      setWinner("You Lost!");
      setBattleLog("Your Pokémon fainted. Try again!");
      return;
    }

    setBattleLog(
      `${player.name} dealt ${damage} damage! The opponent dealt ${enemyDamage} damage back.`
    );
  }

  const artwork = (pokemon) =>
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`;

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">TRAINER CHALLENGE</p>
        <h1>Battle Arena</h1>
        <p>Fight your opponent and prove your Pokémon skills!</p>
      </section>

      <section className="battle-arena">
        <div className="battle-card">
          <h2>Your Pokémon</h2>

          {player ? (
            <>
              <img src={artwork(player)} alt={player.name} />
              <h3>{player.name}</h3>

              <div className="hp-track">
                <div
                  className="hp-fill"
                  style={{ width: `${playerHP}%` }}
                />
              </div>

              <p>HP: {playerHP}/100</p>
            </>
          ) : (
            <p>No Pokémon selected</p>
          )}
        </div>

        <div className="battle-middle">
          <span className="versus">VS</span>
          <button className="primary-button" onClick={startBattle}>
            {battleStarted && !winner ? "Restart Battle" : "Start Battle"}
          </button>
          <button
            className="team-button"
            onClick={attack}
            disabled={!battleStarted || Boolean(winner)}
          >
            Attack!
          </button>
        </div>

        <div className="battle-card">
          <h2>Opponent</h2>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"
            alt="Opponent Pokémon"
          />
          <h3>Charizard</h3>

          <div className="hp-track">
            <div
              className="hp-fill opponent-hp"
              style={{ width: `${opponentHP}%` }}
            />
          </div>

          <p>HP: {opponentHP}/100</p>
        </div>
      </section>

      <section className="battle-message">
        <h2>{winner || "Battle Status"}</h2>
        <p>{battleLog}</p>
      </section>

      <p className="battle-note">
        Note: This is a simulated battle. Damage is randomly generated.
      </p>
    </main>
  );
}

export default BattleArena;
