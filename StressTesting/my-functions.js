module.exports = {
  generateRandomData
};

const Faker = require('faker');

function generateRandomData(userContext, events, done) {
  const id = Faker.random.number({
    'min': 0,
    'max': 99999999
  });
  userContext.vars.id = id;
  return done();
}