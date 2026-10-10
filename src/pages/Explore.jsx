
import React, { useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import PokemonModal from "../components/PokemonModal";
import { getPokemonCollection } from "../services/pokemonApi";

export default function Explore({ caught, onCatch }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadPokemon() {
      try {
        const data = await getPokemonCollection(24);
        if (active) setPokemon(data);
      } catch {
        if (active) setError("Unable to load Pokémon.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPokemon();

    return () => {
      active = false;
    };
  }, []);

  const types = useMemo(() => {
    return [
      "all",
      ...new Set(
        pokemon.flatMap((p) =>
          p.types.map((t) => t.type.name)
        )
      ),
    ];
  }, [pokemon]);

  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesType =
        typeFilter === "all" ||
        p.types.some((t) => t.type.name === typeFilter);

      return matchesSearch && matchesType;
    });
  }, [pokemon, search, typeFilter]);

  return (
    <section className="section-block" id="explore">
      <div className="section-heading">
        <div>
          <div className="eyebrow">THE WILD IS WAITING</div>
          <h2>
            Explore <span>Pokémon</span>
          </h2>
          <p>Find your next teammate in the wild.</p>
        </div>

        <div className="result-count">
          {filteredPokemon.length} DISCOVERIES
        </div>
      </div>

      <div className="filter-row">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokémon..."
          />
        </label>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type === "all" ? "All types" : type}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="state-message">
          Discovering Pokémon...
        </div>
      )}

      {error && (
        <div className="state-message error-state">
          {error}
        </div>
      )}

      <div className="pokemon-grid">
        {filteredPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            onSelect={setSelected}
            onCatch={onCatch}
            isCaught={caught.some((item) => item.id === p.id)}
          />
        ))}
      </div>

      <PokemonModal
        pokemon={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
