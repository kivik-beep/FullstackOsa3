const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body '));


let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Phonebook!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
    const response = '<p> Phonebook has '+persons.length+' contacts<p>'
    res.send(response + new Date)
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
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {  
    const person = request.body 

    if (!person.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!person.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    var taken = persons.find(p => p.name === person.name)||null

    if (taken != null) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    person.id = Math.floor(Math.random()*1000)
    console.log(person)  
    persons = persons.concat(person)
    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })