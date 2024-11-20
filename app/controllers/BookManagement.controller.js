const Books = require('../models/Book');
exports.addBooks = async (req, res) => {

    try {
    await Books.create(req.body)
    .then(book => {res.status(201).send(book);})
    }
    catch(err) {res.status(500).send({ message: err.message });}
}

exports.deleteBooks = (req, res) => {
    Books.deleteOne({idBook: req.params.id})
    .then(() => {res.send('Book deleted successfully!')})
    .catch(err => {res.status(500).send({ message: err.message });})
}

exports.findBook = async(req, res) => {
    await Books.find({idBook: req.params.id}) 
    .then(books => {res.json(books)})
    .catch(err => {res.status(500).send({ message: err.message });})
}
exports.updateBooks = async (req, res) => {
    await Books.updateOne({idBook: req.params.id}, {$set: req.body})
    .then(book => {res.json(book)})
    .catch(err => {res.status(500).send({ message: err.message });})
}
exports.getAllBook = async (req, res) => {
   await Books.find({})
   .then(books => {res.json(books)})
   .catch(err => {
    res.status(500).send({ message: err.message });})
}
