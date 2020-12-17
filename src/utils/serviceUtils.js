import axios from 'axios'

export const getData = (url,successFunc,errFunc) => {
    axios.get(url)
    .then(res => successFunc(res))
    .catch(err => errFunc(err))
}

export const postData = (url,params,successFunc, errFunc) => {
    axios.post(url, params)
    .then(res => successFunc(res))
    .catch(err => errFunc(err))
}

export const deleteData = (url, successFunc, errFunc) => {
    axios.delete(url)
    .then(res => successFunc(res))
    .catch(err => errFunc(err))
}