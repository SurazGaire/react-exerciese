import { useState } from "react";

const App = () =>{

  const [persons,setPersons] = useState(
    [
      {
        name:'Peter Parker',
        id:1
      }
    ]
    )
    const [newName,setNewName] = useState('my name')

    const displayText = (e)=>{
      e.preventDefault()
      setNewName(e.target.value)
    }

    const addPerson = () =>{
      console.log(newName);
      const myObject = {
        name : newName,
        id : persons.length + 1,
      }
      setPersons(persons.concat(myObject))
      setNewName('')
    }

  return(
    <div>
    <h2>Phonebook</h2>
        <div>
          name : <input onChange={displayText} value={newName} />
        </div>
        <div>
          <button onClick={addPerson}>Add</button>
        </div>
      <h2>Numbers</h2>
      {persons.map(person=> <h4 key={person.id}>{person.name}</h4>)}
    </div>
  )
}

export default App;
