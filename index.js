const express = require('express')
const app = express()
const morgan = require('morgan') // Fancy logger for node.js
const cors = require('cors')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

// morgan
morgan.token('body', (request) => {
  return JSON.stringify(request.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

/*
 logging data even in the console can be dangerous
 since it can contain sensitive data and may violate
 local privacy law (e.g. GDPR in EU) or business-standard.
*/

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => Math.floor(Math.random() * 1e9)

const nameInPersons = (name) => {
  return persons.find(p => p.name === name) || false
}


app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const numPeople = persons.length
  const date = new Date()
  const info = `<p>Phonebook has info for ${numPeople} people</p>
    <p>${date.toString()}</p>`
  response.end(info)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    persons = persons.filter(p => p.id !== id)
    response.status(202).json(person)
  } else {
    response.status(204).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'both name and number are required'
    })
  }

  if (nameInPersons(body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })

  }


  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.status(201).json(person)
})

app.put('/api/persons/:id', (request, response) => {
  const newPerson = request.body
  const id = Number(request.params.id)

  if (!(newPerson.number && newPerson.name)) {
    response.status(400).json({
      error: 'both name and number field must be filled'
    })
  }

  if (!(persons.find(p => p.id === id))) {
    response.status(400).json({
      error: `id:${id} is already deleted`
    })
  }

  persons = persons.filter(p => p.id !== id)
  persons = persons.concat(newPerson)

  response.status(200).json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)