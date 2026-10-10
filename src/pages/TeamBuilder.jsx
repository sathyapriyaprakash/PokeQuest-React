import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../services/pokemonApi";
import PokemonCard from "../components/PokemonCard";

function TeamBuilder({ caught = [], team = [], setTeam, onSelect }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPokemon() {
      try {
        const details = await Promise.all(
          caught.map(async (pokemon) => {
            const name =
              typeof pokemon === "string" || typeof pokemon === "number"
                ? pokemon
                : pokemon.name || pokemon.id;

            if (!name) return null;

            try {
              return await getPokemonDetails(name);
            } catch {
              return null;
            }
          })
        );

        if (active) setPokemonList(details.filter(Boolean));
      } catch (error) {
        console.error("Failed to load Pokémon:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPokemon();

    return () => {
      active = false;
    };
  }, [caught]);

  const isInTeam = (pokemon) =>
    team.some((member) => String(
      typeof member === "object" ? member.id || member.name : member
    ) === String(pokemon.id) ||
    String(typeof member === "object" ? member.name : member) === pokemon.name);

  function toggleTeam(pokemon) {
    if (!setTeam) {
      alert("Team selection is not connected yet.");
      return;
    }

    if (isInTeam(pokemon)) {
      setTeam(
        team.filter(
          (member) =>
            String(typeof member === "object" ? member.id || member.name : member) !==
              String(pokemon.id) &&
            String(typeof member === "object" ? member.name : member) !== pokemon.name
        )
      );
      return;
    }

    if (team.length >= 3) {
      alert("Your team can contain only 3 Pokémon!");
      return;
    }

    setTeam([...team, pokemon]);
  }

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">BUILD YOUR DREAM TEAM</p>
        <h1>Team Builder</h1>
        <p>Select up to 3 Pokémon from your collection.</p>
      </section>

      <section className="team-slots">
        {[0, 1, 2].map((slot) => {
          const member = team[slot];

          return (
            <div className="team-slot" key={slot}>
              {member ? (
                <>
                  <img
                    src={
                      member.sprites?.other?.["official-artwork"]?.front_default ||
                      member.sprites?.front_default ||
                      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${member.id}.png`
                    }
                    alt={member.name || "Team Pokémon"}
                  />
                  <strong>{member.name || `Pokémon ${slot + 1}`}</strong>
                  <button
                    className="remove-button"
                    onClick={() => toggleTeam(member)}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <span>Slot {slot + 1}<br />Empty</span>
              )}
            </div>
          );
        })}
      </section>

      <h2 className="section-title">Choose Your Pokémon</h2>

      {loading ? (
        <p className="status-message">Loading your collection...</p>
      ) : pokemonList.length === 0 ? (
        <section className="empty-state">
          <h2>No Pokémon available</h2>
          <p>Catch Pokémon in Explore before building your team.</p>
          <a href="/explore" className="primary-button">
            Explore Pokémon
          </a>
        </section>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => {
            const selected = isInTeam(pokemon);

            return (
              <div className="team-pokemon" key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  onSelect={onSelect}
                  isCaught={true}
                />
                <button
                  className={selected ? "remove-button" : "team-button"}
                  onClick={() => toggleTeam(pokemon)}
                >
                  {selected ? "Remove from Team" : "Add to Team"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default TeamBuilder;
