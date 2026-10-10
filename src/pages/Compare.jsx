import React, { useState } from "react";
import { getPokemonDetails } from "../services/pokemonApi";

function Compare() {
  const [firstName, setFirstName] = useState("pikachu");
  const [secondName, setSecondName] = useState("charizard");
  const [firstPokemon, setFirstPokemon] = useState(null);
  const [secondPokemon, setSecondPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function comparePokemon(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setFirstPokemon(null);
    setSecondPokemon(null);

    try {
      const [first, second] = await Promise.all([
        getPokemonDetails(firstName.trim().toLowerCase()),
        getPokemonDetails(secondName.trim().toLowerCase()),
      ]);

      setFirstPokemon(first);
      setSecondPokemon(second);
    } catch {
      setError("Pokémon not found. Check the names or Pokédex IDs and try again.");
    } finally {
      setLoading(false);
    }
  }

  function getStat(pokemon, statName) {
    return pokemon?.stats.find((item) => item.stat.name === statName)?.base_stat || 0;
  }

  const stats = [
    { name: "HP", key: "hp" },
    { name: "Attack", key: "attack" },
    { name: "Defense", key: "defense" },
    { name: "Special Attack", key: "special-attack" },
    { name: "Special Defense", key: "special-defense" },
    { name: "Speed", key: "speed" },
  ];

  function artwork(pokemon) {
    return (
      pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
      pokemon?.sprites?.front_default
    );
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">POKÉMON ANALYTICS</p>
        <h1>Stat Comparison</h1>
        <p>Compare two Pokémon and discover their strengths.</p>
      </section>

      <form className="compare-form" onSubmit={comparePokemon}>
        <label>
          First Pokémon
          <input
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Example: pikachu"
            required
          />
        </label>

        <span className="compare-vs">VS</span>

        <label>
          Second Pokémon
          <input
            value={secondName}
            onChange={(event) => setSecondName(event.target.value)}
            placeholder="Example: charizard"
            required
          />
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Comparing..." : "Compare Pokémon"}
        </button>
      </form>

      {error && <p className="compare-error">{error}</p>}

      {firstPokemon && secondPokemon && (
        <section className="comparison-results">
          <div className="comparison-pokemon">
            <img src={artwork(firstPokemon)} alt={firstPokemon.name} />
            <h2>{firstPokemon.name}</h2>
            <p>
              Total Base Stats:{" "}
              {firstPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0)}
            </p>
          </div>

          <div className="comparison-pokemon">
            <img src={artwork(secondPokemon)} alt={secondPokemon.name} />
            <h2>{secondPokemon.name}</h2>
            <p>
              Total Base Stats:{" "}
              {secondPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0)}
            </p>
          </div>

          <div className="stat-comparison">
            {stats.map((stat) => {
              const firstValue = getStat(firstPokemon, stat.key);
              const secondValue = getStat(secondPokemon, stat.key);
              const maxValue = Math.max(firstValue, secondValue, 1);

              return (
                <div className="stat-row" key={stat.key}>
                  <div className="stat-label">
                    <span>{firstValue}</span>
                    <strong>{stat.name}</strong>
                    <span>{secondValue}</span>
                  </div>

                  <div className="comparison-bars">
                    <div className="bar-left">
                      <div
                        className="stat-fill first-fill"
                        style={{ width: `${(firstValue / maxValue) * 100}%` }}
                      />
                    </div>
                    <div className="bar-right">
                      <div
                        className="stat-fill second-fill"
                        style={{ width: `${(secondValue / maxValue) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="comparison-verdict">
            <h2>Comparison Result</h2>
            <p>
              {firstPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0) ===
              secondPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0)
                ? "Both Pokémon have equal total base stats!"
                : firstPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0) >
                  secondPokemon.stats.reduce((sum, item) => sum + item.base_stat, 0)
                ? `${firstPokemon.name} has higher total base stats.`
                : `${secondPokemon.name} has higher total base stats.`}
            </p>
            <small>
              Total base stats indicate overall base-stat points, not guaranteed
              battle victory.
            </small>
          </div>
        </section>
      )}
    </main>
  );
}

export default Compare;
