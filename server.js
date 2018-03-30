require('newrelic');
const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

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

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layouts');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

// see: https://medium.com/styled-components/the-simple-guide-to-server-side-rendering-react-with-styled-components-d31c6b2b8fbf
const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}

app.get('/restaurants/:id/', function(req, res){
  let components = renderComponents(services, {itemid: req.params.id});
  console.log(services);
  res.end(Layout(
    'marZagat',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`)
});
