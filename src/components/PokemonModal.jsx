
import React from "react";

export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  const name = pokemon.name
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");

  const image =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <section
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${name} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-art">
          <img src={image} alt={name} />
        </div>

        <div className="modal-content">
          <h2>{name}</h2>
          <p>Pokédex #{String(pokemon.id).padStart(3, "0")}</p>

          <h3>Types</h3>
          <div className="type-tags">
            {pokemon.types.map(({ type }) => (
              <span className={`type-tag ${type.name}`} key={type.name}>
                {type.name}
              </span>
            ))}
          </div>

          <h3>Abilities</h3>
          <div className="ability-list">
            {pokemon.abilities.map(({ ability }) => (
              <span key={ability.name}>{ability.name}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
