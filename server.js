const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortURL')

mongoose.connect('mongodb://localhost/tinify',{
    useNewUrlParser: true, useUnifiedTopology: true
})

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

app.get('/', async (req, res) => {
    const shortURLs = await ShortUrl.find()
    res.render('index', {shortURLs: shortURLs})
})

app.post('/tinify', async (req, res) => {
    await ShortUrl.create({fullURL: req.body.fullURL})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({shortURL: req.params.shortUrl})

    if (shortUrl == null) {return(res.sendStatus(404))}

    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.fullURL)

})

app.listen(5000)
