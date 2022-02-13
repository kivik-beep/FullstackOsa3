const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {    
    console.log('connected to MongoDB')  
  })  
  .catch((error) => {    
    console.log('error connecting to MongoDB:', error.message)  
  })

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength:3,
        unique: true,
        required: true
    },
    number: {
        type: String,
        minlength:8,
        validate: {
            validator: function(v) {
              const parts = v.split('-')
              console.log(parts)
                if (parts[0].length > 3 || parts[0].length < 2){
                  return false
                } else if (parts.length > 2) {
                  return false
                } else {
                  return true
                }
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: true
    },
 })

 contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)