import '@testing-library/jest-dom/extend-expect'
import 'whatwg-fetch'

if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder
}
