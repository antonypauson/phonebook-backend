const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(cors())

app.use(morgan('tiny'))

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.post('/api/persons/', (request, response) => {
  const id = Math.floor(Math.random() * 100)
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(404).json({
      error: "name or number is missing"
    })
  }

  let nameExists = false
  persons.forEach(person => {
    if (person.name === body.name) {
      nameExists = true
    }
  })
  console.log('nameExists', nameExists)

  if (!nameExists) {
    const person = {
      name: body.name,
      number: String(body.number),
      id: String(id)
    }
    persons = persons.concat(person)
    response.json(persons)
    console.log(id)
    console.log(body.name)
  }
  else {
    return response.status(400).json({
      error: "name must be unique"
    })
  }
  
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  // response.send(id)
  const person = persons.find(n => n.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(n => n.id !== id)
  console.log(`Deleted ${id}`)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  const numberOfEntires = persons.length
  const date = new Date().toString()
  response.send(`<p>Phonebook has info for ${numberOfEntires} people</p>
                <p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})