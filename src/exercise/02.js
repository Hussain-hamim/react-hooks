// useEffect: persistent state
// 💯 flexible localStorage hook
// http://localhost:3000/isolated/final/02.extra-4.js

import * as React from 'react'

function useLocalStorageState(
  key,
  defaultValue = '',
  // the = {} fixes the error we would get from destructuring when no argument was passed
  // Check https://jacobparis.com/blog/destructure-arguments for a detailed explanation

  // optional options:
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  // we passed the "lazy initialization function" to state as initial value
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      // the try/catch is here in case the localStorage value was set before
      // we had the serialization in place (like we do in previous extra credits)
      try {
        return deserialize(valueInLocalStorage)
      } catch (error) {
        window.localStorage.removeItem(key)
      }
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  // we are maintaining the previous key or state with useRef(keep value between render and do not cause render):
  const prevKeyRef = React.useRef(key)

  // Check the example at src/examples/local-state-key-change.js to visualize a key change
  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  // serialization and deserialization in js:
  // refer to the way in which we we convert data into a format that cen be easily stored or
  // transmitted and convert back to original form.

  // 1. obj is serialize into json sting
  const obj = {name: 'Hussain', age: 22}
  const serializeObj = JSON.stringify(obj)
  console.log('object: ', obj)
  console.log('serialize: ', serializeObj)

  // 2. deserialization is the reverse process
  const serObj = '{"name":"Hussain","age":22}'
  const obj2 = JSON.parse(serObj)
  console.log(obj2)

  return <Greeting />
}

export default App
