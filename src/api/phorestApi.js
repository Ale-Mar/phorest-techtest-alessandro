import axios from "axios";
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export default axios.create({
    baseURL: 'http://api-gateway-dev.phorest.com/third-party-api-server/api/business/',
    auth: {
        username: 'global/cloud@apiexamples.com',
        password: 'VMlRo/eh+Xd8M~l'
    }
})