const errorHandlerMiddleware = async (err, req, res, next) => {
    process.env.SITE_ENV === 'development' ? console.log(err) : false;
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandlerMiddleware