
import React, { useEffect, useState } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import PokemonModal from "./components/PokemonModal";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Collection from "./pages/Collection";
import TeamBuilder from "./pages/TeamBuilder";
import BattleArena from "./pages/BattleArena";
import Compare from "./pages/Compare";
import WeaknessAnalyzer from "./pages/WeaknessAnalyzer";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";

function readSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [caught, setCaught] = useState(() =>
    readSaved("pokequest-caught", [])
  );

  const [team, setTeam] = useState(() =>
    readSaved("pokequest-team", [])
  );

  const [xp, setXp] = useState(() =>
    readSaved("pokequest-xp", 0)
  );

  const [wins, setWins] = useState(() =>
    readSaved("pokequest-wins", 0)
  );

  const [selected, setSelected] = useState(null);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("pokequest-caught", JSON.stringify(caught));
  }, [caught]);

  useEffect(() => {
    localStorage.setItem("pokequest-team", JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem("pokequest-xp", JSON.stringify(xp));
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("pokequest-wins", JSON.stringify(wins));
  }, [wins]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSelected(null);
  }, [location.pathname]);

  function catchPokemon(pokemon) {
    if (!pokemon) return;

    const alreadyCaught = caught.some(
      (item) => item.id === pokemon.id
    );

    if (alreadyCaught) {
      setSelected(null);
      return;
    }

    setCaught((previous) => [...previous, pokemon]);
    setXp((previous) => previous + 10);
    setSelected(null);
  }

  function removePokemon(pokemonId) {
    setCaught((previous) =>
      previous.filter((pokemon) => pokemon.id !== pokemonId)
    );

    setTeam((previous) =>
      previous.filter((pokemon) => pokemon.id !== pokemonId)
    );
  }

  function handleSetTeam(nextTeam) {
    setTeam(nextTeam.slice(0, 3));
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/explore"
            element={
              <Explore
                caught={caught}
                onCatch={catchPokemon}
                onSelect={setSelected}
              />
            }
          />

          <Route
            path="/collection"
            element={
              <Collection
                caught={caught}
                onSelect={setSelected}
                onRemove={removePokemon}
              />
            }
          />

          <Route
            path="/team"
            element={
              <TeamBuilder
                caught={caught}
                team={team}
                setTeam={handleSetTeam}
                onSelect={setSelected}
              />
            }
          />

          <Route
            path="/battle"
            element={<BattleArena team={team} />}
          />

          <Route path="/compare" element={<Compare />} />

          <Route
            path="/weakness"
            element={<WeaknessAnalyzer />}
          />

          <Route path="/quiz" element={<Quiz />} />

          <Route
            path="/profile"
            element={
              <Profile
                trainerName="Pokémon Trainer"
                xp={xp}
                wins={wins}
                caught={caught}
                team={team}
              />
            }
          />

          <Route
            path="*"
            element={
              <section className="page-container empty-state">
                <h1>Page Not Found</h1>
                <p>That destination isn't part of this adventure.</p>
                <a href="/" className="primary-button">
                  Back to Home
                </a>
              </section>
            }
          />
        </Routes>
      </main>

      {selected && (
        <PokemonModal
          pokemon={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <footer className="footer">
        <p>PokéQuest · Pokémon data provided by PokéAPI.</p>
        <a
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
        >
          Powered by PokéAPI ↗
        </a>
      </footer>
    </div>
  );
}

export default App;
