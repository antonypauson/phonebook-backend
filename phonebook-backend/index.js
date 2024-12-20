const express = require('express')
const app = express()

entries = [
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

app.get('/', (request, response) => {
    response.send('<h1>Hello Express</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(entries)
})

app.get('/info',(request, response) => {
    const date = new Date().toString()
    const length = entries.length
    response.send(`<p>Phonebook has info for ${length} people
        <br/>
        ${date}
        </p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})