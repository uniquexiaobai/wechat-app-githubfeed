const services = require('../../utils/services.js');

function findUserByName(name, callback) {
  const url = 'https://api.github.com/users/' + name;

  services.fetch(url).then(res => {
    if (res.data.avatar_url) {
      return callback(res.data.avatar_url);
    }
  });
}

module.exports = {
  findUserByName: findUserByName
};
