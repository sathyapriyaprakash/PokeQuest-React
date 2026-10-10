
import React from "react";

export default function PokemonCard({
  pokemon,
  onSelect,
  onCatch,
  isCaught = false,
}) {
  const image =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.front_default ||
    "";

  const name = pokemon.name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <article className="pokemon-card">
      <div className="card-topline">
        <span className="pokemon-id">
          #{String(pokemon.id).padStart(3, "0")}
        </span>

        <button
          className={isCaught ? "heart-button saved" : "heart-button"}
          onClick={() => onCatch(pokemon)}
          aria-label={`Catch ${name}`}
        >
          {isCaught ? "✓" : "+"}
        </button>
      </div>

      <button
        className="pokemon-art-button"
        onClick={() => onSelect(pokemon)}
      >
        <img src={image} alt={name} loading="lazy" />
      </button>

      <h3>{name}</h3>

      <div className="type-tags">
        {pokemon.types.map(({ type }) => (
          <span className={`type-tag ${type.name}`} key={type.name}>
            {type.name}
          </span>
        ))}
      </div>
    </article>
  );
}
