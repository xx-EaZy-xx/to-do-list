module.exports = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  maxAge: 3600,
}
