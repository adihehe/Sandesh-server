export const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],

  // origin: 'http://localhost:5173', // Your frontend origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true // Allow cookies to be sent and received

};