const Dev = {
  apiDomain: 'http://localhost:3000'
}

const Prod = {
  apiDomain: 'https://keisei.top:3000'
}
let Env
if (window.location.href.indexOf('keisei') > -1 || window.location.href.indexOf('ixiqi') > -1) {
  Env = Prod
} else {
  Env = Dev
}

module.exports = Env
