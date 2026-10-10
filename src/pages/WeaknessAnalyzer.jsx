import React, { useState } from "react";
import { getPokemonDetails } from "../services/pokemonApi";
import { getTypeInfo } from "../utils/typeEffectiveness";

function WeaknessAnalyzer() {
  const [pokemonName, setPokemonName] = useState("charizard");
  const [pokemon, setPokemon] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzePokemon(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setPokemon(null);
    setAnalysis(null);

    try {
      const data = await getPokemonDetails(
        pokemonName.trim().toLowerCase()
      );

      const types = data.types.map((item) => item.type.name);

      const typeDetails = types.map((type) => ({
        type,
        info: getTypeInfo(type),
      }));

      setPokemon(data);
      setAnalysis(typeDetails);
    } catch {
      setError("Pokémon not found. Enter a valid name or Pokédex ID.");
    } finally {
      setLoading(false);
    }
  }

  const artwork = (data) =>
    data?.sprites?.other?.["official-artwork"]?.front_default ||
    data?.sprites?.front_default;

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">BATTLE STRATEGY</p>
        <h1>Weakness Analyzer</h1>
        <p>Discover your Pokémon's strengths and weaknesses.</p>
      </section>

      <form className="analyzer-form" onSubmit={analyzePokemon}>
        <label htmlFor="pokemon-name">Pokémon Name or ID</label>

        <div className="analyzer-input-row">
          <input
            id="pokemon-name"
            value={pokemonName}
            onChange={(event) => setPokemonName(event.target.value)}
            placeholder="Example: pikachu"
            required
          />

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </form>

      {error && <p className="compare-error">{error}</p>}

      {pokemon && analysis && (
        <section className="analysis-results">
          <div className="analysis-header">
            <img src={artwork(pokemon)} alt={pokemon.name} />

            <div>
              <p className="eyebrow">POKÉMON REPORT</p>
              <h2>{pokemon.name}</h2>

              <div className="type-tags">
                {pokemon.types.map(({ type }) => (
                  <span className="type-tag" key={type.name}>
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {analysis.map(({ type, info }) => (
            <div className="type-analysis-card" key={type}>
              <h3>{type} Type Analysis</h3>

              <div className="analysis-category">
                <h4>Weak Against</h4>
                <div className="analysis-tags">
                  {info.weak?.length ? (
                    info.weak.map((item) => (
                      <span className="weak-tag" key={item}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <span>No weakness data available</span>
                  )}
                </div>
              </div>

              <div className="analysis-category">
                <h4>Resistant Against</h4>
                <div className="analysis-tags">
                  {info.resistant?.length ? (
                    info.resistant.map((item) => (
                      <span className="resistant-tag" key={item}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <span>No resistance data available</span>
                  )}
                </div>
              </div>

              <div className="analysis-category">
                <h4>Immune Against</h4>
                <div className="analysis-tags">
                  {info.immune?.length ? (
                    info.immune.map((item) => (
                      <span className="immune-tag" key={item}>
                        {item}
                      </span>
                    ))
                  ) : (
                    <span>No immunity data available</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          <p className="analysis-note">
            Type effectiveness is shown per type. For Pokémon with two types,
            combined effectiveness may differ.
          </p>
        </section>
      )}
    </main>
  );
}

export default WeaknessAnalyzer;
