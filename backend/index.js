// const express = require('express'),
//   path = require('path')
const express = requires('express');
const app = express()

// Import
const blogRoutes = require('./routes/blogRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const logInRoutes = require('./routes/logInRoutes');

// app.get('/api', (_request, response) => {
//   response.send({ hello: 'World' })
// })

// Use
app.use('/blog', blogRoutes);
app.use('/gallery', galleryRoutes);
app.use('/login', logInRoutes);

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
