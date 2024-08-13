import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import './styles2.css'

// the delay argument is for faking things out a bit
function fetchPokemon(first, delay = 1500) {
  return window
    .fetch('https://graphql-pokemon2.vercel.app/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        delay: delay,
      },
      body: JSON.stringify({
        variables: {first: first},
      }),
    })
    .then(async response => {
      const {data} = await response.json()
      if (response.ok) {
        const pokemons = data?.pokemons
        if (pokemons) {
          return pokemons
          console.log(pokemons)
        } else {
          return Promise.reject(new Error(`No pokemon with the name`))
        }
      } else {
        // handle the graphql errors
        const error = {
          //   message: data?.errors?.map(e => e.message).join('\n'),
          message: 'an error occurred',
        }
        return Promise.reject(error)
      }
    })
}

function PokemonDataView({pokemon}) {
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
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
      <small className="pokemon-info__fetch-time">date to show...</small>
    </div>
  )
}

export {PokemonDataView, fetchPokemon}
