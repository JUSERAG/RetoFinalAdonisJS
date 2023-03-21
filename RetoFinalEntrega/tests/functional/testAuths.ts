import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export async function obtenerTokenAutorizacion(): Promise<string> {
    let endPoint = '/api/v1/login'
    let body = {
        email: 'rodrigo@gmail.com',
        password: '12345'
    }
    let axiosResponse = await axios.post(`${Env.get('PATH_APP') + endPoint}`, body)
    return axiosResponse.data['token']
}