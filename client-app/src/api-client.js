// require('dotenv').config()
// const api = require('../../users-api-client-0')
import api from 'users-api-client-0'

api.protocol = process.env.REACT_APP_API_PROTOCOL
api.host = process.env.REACT_APP_API_HOST
api.port = process.env.REACT_APP_API_PORT

export default api