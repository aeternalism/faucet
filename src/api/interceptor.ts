import axios from 'axios'
import { AES_BASE_URL } from '../constants/paths'

const AESApi = axios.create({
  baseURL: AES_BASE_URL,
})

AESApi.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'text/plain'
  // Important: request interceptors **must** return the request.
  return req
})

export { AESApi }
