// useEffect: persistent state
// http://localhost:3000/isolated/final/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') ?? initialName,
  )

  const [lname, setLname] = React.useState(window.localStorage.getItem('lname'))

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
    window.localStorage.setItem('lname', lname)
  })

  function handleChange(event) {
    setName(event.target.value)
    setLname(event.target.value)
  }

  function handleChange2(event) {
    setLname(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <input value={lname} onChange={handleChange2} id="lname" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}

      <p>
        value get from local storage: {window.localStorage.getItem('lname')}
      </p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
