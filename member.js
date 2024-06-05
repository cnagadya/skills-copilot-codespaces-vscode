function skillsMember() {
  return new Promise((resolve, reject) => {
    const member = require('./member');
    resolve(member.skills());
  });
}
