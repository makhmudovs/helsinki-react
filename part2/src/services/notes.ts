import axios from 'axios'
const baseUrl = '/api/notes'


let token: string | null = null


const setToken = (newToken:string) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

interface CreateObject {
  content:string;
  important:boolean;
}

const create = async (newObject:CreateObject) => {
  const config = {
    headers: { Authorization: token },
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id:string, newObject:CreateObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update, setToken }