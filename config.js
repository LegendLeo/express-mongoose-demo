const DB = {
  host: 'localhost',
  port: 1234,
  db: 'demo'
}

module.exports = {
  DB: `${DB.host}:${DB.port}/${DB.db}`
}
