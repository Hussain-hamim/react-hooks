// useEffect: persistent state
// http://localhost:3000/isolated/final/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') ?? initialName,
  )

  const [color, setColor] = React.useState(
    window.localStorage.getItem('color' ?? 'white'),
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
    window.localStorage.setItem('color', color)
  })

  function changeColor() {
    setColor(color === 'white' ? 'gray' : 'white')
  }

  console.log(color)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div style={{background: color, height: '100vh'}}>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}

      <button onClick={changeColor}>change color</button>
    </div>
  )
}

function App() {
  // windows.localStorage web storage api that allow you
  // to store key value pairs in the web browser
  // the data string, persistent and across multiple session
  // basic methods:
  // setItem(key, value)
  // getItem(key)
  // removeItem(key)
  // clear(): clear all

  return <Greeting />
}

export default App
