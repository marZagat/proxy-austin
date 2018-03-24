require('newrelic');
const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.redirect('/restaurants/ChIJUcXYWWGAhYARmjMY2bJAG2s/');
// });

app.use('/restaurants/:id', express.static(path.join(__dirname, 'public')));

// app.get('/api/restaurants/:id/gallery', (req, res) => {
//   res.redirect(`http://13.57.148.57/api/restaurants/${req.params.id}/gallery`)
// });
app.get('/api/restaurants/:id/gallery', (req, res) => {
  res.redirect(`http://127.0.0.1:2222/api/restaurants/${req.params.id}/gallery`)
});
// app.get('/api/restaurants/:id/overview', (req, res) => {
//   res.redirect(`http://184.169.248.150/api/restaurants/${req.params.id}/overview`)
// });
// app.get('/api/restaurants/:id/sidebar', (req, res) => {
//   res.redirect(`http://54.177.233.239/api/restaurants/${req.params.id}/sidebar`)
// });
// app.get('/api/restaurants/:id/recommendations', (req, res) => {
//   res.redirect(`http://52.89.102.101/api/restaurants/${req.params.id}/recommendations`)
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
