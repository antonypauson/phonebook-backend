const express = require('express')
const app = express()

app.use(express.json())

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
        },
        { 
        "id": "5",
        "name": "Kanye Omari West", 
        "number": "39-23-6423122"
        }
]

const generateId = () => {
    const id = Math.floor(Math.random() * 100)
    return String(id)
}

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

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const entry = entries.find(e => e.id === id)
    
    if (entry) {
        response.json(entry)
        console.log(entry)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    entries = entries.filter(e => e.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const newName = body.name
    const alreadyName = (entries.filter(e => e.name === newName)).length > 0 ? true : false

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'give me both name and number'
        })
    } else if (alreadyName) {
        return response.status(400).json({
            error: 'provide a unique name'
        })
    }

    const entry = {
        name: body.name,
        number: String(body.number),
        id: generateId()
    }

    entries = entries.concat(entry)

    console.log('entries', entries)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})