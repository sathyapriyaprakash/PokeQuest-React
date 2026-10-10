import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../services/pokemonApi";
import PokemonCard from "../components/PokemonCard";

function Collection({ caught = [], onSelect }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadCollection() {
      setLoading(true);

      try {
        const savedPokemon = await Promise.all(
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

        if (active) {
          setPokemonList(savedPokemon.filter(Boolean));
        }
      } catch (error) {
        console.error("Unable to load collection:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCollection();

    return () => {
      active = false;
    };
  }, [caught]);

  return (
    <main className="page-container">
      <section className="page-heading">
        <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
        <h1>My Pokémon Collection</h1>
        <p>Every Pokémon you catch becomes part of your adventure.</p>
      </section>

      <div className="collection-summary">
        <span>Pokémon Collected</span>
        <strong>{pokemonList.length}</strong>
      </div>

      {loading ? (
        <p className="status-message">Loading your collection...</p>
      ) : pokemonList.length === 0 ? (
        <section className="empty-state">
          <h2>Your collection is empty!</h2>
          <p>Explore Pokémon and catch your first one to get started.</p>
          <a className="primary-button" href="/explore">
            Explore Pokémon
          </a>
        </section>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={onSelect}
              isCaught={true}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Collection;
