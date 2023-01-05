const notFound = (req, res) => res.status(404).render('partials/notfound',{ message: 'Route does not exist'})

module.exports = notFound