import React, {useState, useEffect} from 'react'

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
