const Dev = {
  apiDomain: 'http://localhost:3000'
}

const Prod = {
  apiDomain: 'https://www.keisei.top'
}
let Env
if (window.location.href.indexOf('keisei') > -1 || window.location.href.indexOf('ixiqi') > -1) {
  Env = Prod
} else {
  Env = Dev
}

module.exports = Env
