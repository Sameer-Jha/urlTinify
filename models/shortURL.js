const mongoose = require('mongoose')
const shortId = require('shortid')

const shortURLschema = mongoose.Schema({
    fullURL:{
        type: 'string',
        required: true,
    },
    shortURL:{
        type: 'string',
        required: true,
        default: shortId.generate
    },
    clicks:{
        type: 'number',
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('shortURL', shortURLschema)