const DB = {
  host: 'localhost',
  port: 27017,
  db: 'movies'
}

module.exports = {
  DB: `${DB.host}:${DB.port}/${DB.db}`
}
