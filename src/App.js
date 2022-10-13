import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  //States
  const [pokemon, setPokemon] = useState({})
  const [searchQuote, setSearchQuote] = useState('1')

  // Sparar pokemon till ett state varje gång sidan laddas

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuote}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
  }, [])

  // Hantera värde i sökruta i search bar
  const handleSearch = (e) => setSearchQuote(e.target.value)

  // Spara pokemon varje gång vi trycker submit
  const getPokemonBySearch = (e) => {
    e.preventDefault()
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuote}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data))
  }

  return (
    <container class='container'>
      <header>
        <form onSubmit={getPokemonBySearch}>
          <input
            class='searchInput'
            onChange={handleSearch}
            type='text'
            placeholder='Search pokemon'
          />
          <button class='btn'>Search</button>
        </form>
      </header>
      <main>
        <img src={pokemon.sprites?.front_default} alt='pokemon' />
        <h1 class='pokemonName'>{pokemon?.name}</h1>
      </main>
      <aside>
        <section class='ability'>
          <ul>
            <p class='title'>Ability</p>
            {pokemon.abilities?.map(({ ability }, i) => (
              <li key={i}>{ability.name}</li>
            ))}
          </ul>
        </section>
        <section class='stats'>
          <ul>
            <p class='title'>Stats</p>
            {pokemon.stats?.map(({ base_stat, stat: { name } }, i) => (
              <li key={i}>
                {base_stat} {name}
              </li>
            ))}
          </ul>
        </section>
        <section class='types'>
          <ul>
            <p class='title'>Types</p>
            {pokemon.types?.map(({ type: { name } }, i) => {
              return <li key={i}>{name}</li>
            })}
          </ul>
        </section>
      </aside>
    </container>
  )
}

export default App
