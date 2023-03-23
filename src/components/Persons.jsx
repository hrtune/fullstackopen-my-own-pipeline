import React from 'react'
import PropTypes from 'prop-types'

const Person = ({ name, number, deletePerson }) => (
  <div>
    <p>{name} {number} <button onClick={deletePerson}>delete</button></p>
  </div>
)
Person.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  deletePerson: PropTypes.func
}

const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map((person) => <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person)}/>)
  )
}

export default Persons