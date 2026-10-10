
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          YOUR ADVENTURE STARTS HERE
        </div>

        <h1>
          Catch your next
          <br />
          <span>legend.</span>
        </h1>

        <p>
          Discover Pokémon, build your dream team,
          and prove yourself in the arena.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/explore">
            Explore Pokémon ↗
          </Link>

          <Link className="secondary-button" to="/collection">
            My Collection →
          </Link>
        </div>
      </div>

      <div className="hero-art">
        <div className="orbit orbit-a" />
        <div className="orbit orbit-b" />
        <div className="hero-glow" />

        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
          alt="Pikachu"
        />

        <div className="floating-label label-top">
          ✦ RARE DISCOVERY
        </div>

        <div className="floating-label label-bottom">
          PIKACHU
          <small>#025 · ELECTRIC</small>
        </div>
      </div>
    </section>
  );
}
