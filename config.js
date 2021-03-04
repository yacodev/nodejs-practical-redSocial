module.exports = {
  api:{
    port: process.env.API_PORT || 3000,
  },
  jwt:{
    secret : process.env.JWT_SECRET ||'notesecret',
  },
  mysql:{
    host: process.env.MYSQL_HOST||'remotemysql.com',
    user: process.env.MYSQL_USER||'sSMJ7EQyRn',
    password: process.env.MYSQL_PASSWORD||'wJvKZtOPXD',
    database: process.env.MYSQL_DATABASE||'sSMJ7EQyRn',
  }
}