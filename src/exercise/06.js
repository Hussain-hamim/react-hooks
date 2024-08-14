import React, {useState, useEffect} from 'react'

function PokemonForm() {
  const [pokemonName, setPokemonName] = useState('')

  React.useEffect(() => {}, [])

  function handleChange(e) {
    setPokemonName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <form onSubmit={handleSubmit} className="pokemon-form">
      <label htmlFor="pokemonName-input">Pokemon Name</label>

      <small>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('pikachu')}
        >
          "pikachu"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('charizard')}
        >
          "charizard"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('mew')}
        >
          "mew"
        </button>
      </small>
      <div>
        <input
          className="pokemonName-input"
          id="pokemonName-input"
          name="pokemonName"
          placeholder="Pokemon Name..."
          value={pokemonName}
          onChange={handleChange}
        />
        <button type="submit" disabled={!pokemonName.length}>
          Submit
        </button>
      </div>
    </form>
  )
}

function PokemonList() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function fetchPokemons() {
      const query = `
        {
          pokemons(first: 10) {
            id
        number
        name
        image
        attacks {
          special {
            name
            type
            damage
          }
        }
          }
        }
      `

      const response = await fetch('https://graphql-pokemon2.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      })

      const result = await response.json()
      setPokemons(result.data.pokemons)
    }

    fetchPokemons()
  }, [])

  return (
    <>
      <div>
        <PokemonForm />
      </div>
      {pokemons.map(pokemon => {
        return (
          <div className="pokemon-info__img-wrapper">
            <img src={pokemon.image} alt={pokemon.name} />

            <section>
              <h2>
                {pokemon.name}
                <sup>{pokemon.number}</sup>
              </h2>
            </section>

            <section>
              <ul>
                {pokemon.attacks.special.map(attack => (
                  <li key={attack.name}>
                    <label>{attack.name}</label>:{' '}
                    <span>
                      {attack.damage} <small>({attack.type})</small>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )
      })}
    </>
  )
}

export default PokemonList
