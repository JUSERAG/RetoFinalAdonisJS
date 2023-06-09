import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create form', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "estudianteId": 1,
    "answers": [1,5,9,13]
}
  const response = await client.post('/api/v1/form/postQuestions').json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('Fail Create form', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "estudianteId": 100, //NO EXISTE ESTUDIANTE CON ID 100
    "answers": [1,5,9,13]
}
  const response = await client.post('/api/v1/form/postQuestions').json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(400)
  assert.isObject(response.body())
})

test('get questions', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const response = await client.get('/api/v1/form/getQuestions').header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})