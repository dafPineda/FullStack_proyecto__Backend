function errorHandler(err, req, res, next) {
  console.log('Error:', err.message);

  return res.status(500).json({error: 'Internal Server Error'})
}

module.exports = { errorHandler }