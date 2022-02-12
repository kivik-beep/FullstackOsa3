const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.cdosd.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
})


if(contact.name != null){
contact.save().then(result => {
  console.log('added '+contact.name+' number '+contact.number+'to phonebook')
  mongoose.connection.close()
})
} else {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name+' '+contact.number)
    })
    mongoose.connection.close()
  })
}
