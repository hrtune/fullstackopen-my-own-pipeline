import React from 'react'
import { useState, useEffect } from 'react'
import services from './services/phonebook'
import './App.css'
import Header from './components/Header'
import Input from './components/Input'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    console.log('effect!')
    services.getAll()
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const personByName = (name) => {
    return persons.find(p => name === p.name)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const target = personByName(newName)
    if (target) {
      if (!window.confirm(`${target.name} is alraedy added to phonebook, replace the old number with the new one?`)) {
        return
      }
      const newPerson = { ...target, number: newNumber }
      services.update(newPerson, newPerson.id)
        .then(response => {
          setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
          setNotification({
            message: `Updated ${response.data.name}`,
            state: 'success'
          })
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          if (error.response.status === 404) {
            setNotification({
              message: `Information of ${newPerson.name} has already been removed from server`,
              state: 'error'
            })

            setPersons(persons.filter((p) => p.id !== newPerson.id))
          } else if (error.response.data.errorName === 'ValidationError') {
            setNotification({
              message: error.response.data.error,
              state: 'error'
            })
          }
        })
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    services.create(personObject)
      .then(response => {
        console.log(`add id:${response.data.id} to server`)
        setPersons(persons.concat(response.data))
        setNotification({
          message: `Added ${response.data.name}`,
          state: 'success'
        })
        setTimeout(() => {setNotification(null)}, 3000)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        if (error.response.data.errorName === 'ValidationError') {
          setNotification({
            message: error.response.data.error,
            state: 'error'
          })
        }
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = () => {
    const filterString = filter.toLowerCase()
    return persons.filter((person) => {
      const loweredName = person.name.toLowerCase()
      return loweredName.includes(filterString)
    })
  }

  const deletePerson = (person) => {
    const id = person.id
    if (!(window.confirm(`Delete ${person.name} ?`))) {
      return
    }

    services.remove(id)
      .then(() => {
        setPersons(persons.filter(p => id !== p.id))
      })
  }

  const inputs = [
    {
      text: 'name',
      value: newName,
      onChange: handleNameChange
    },
    {
      text: 'number',
      value: newNumber,
      onChange: handleNumberChange
    }
  ]


  return (
    <div>
      <Header text="Phonebook" />
      <Notification notification={notification} />
      <Input text="filter shown with" value={filter} onChange={handleFilter} />
      <Header text="add a new" />
      <Form onSubmit={addPerson} inputs={inputs} button={{ type:'submit', text: 'add' }} />
      <Header text="Numbers" />
      <Persons persons={filteredPersons()} deletePerson={deletePerson} />
    </div>
  )
}

export default App
