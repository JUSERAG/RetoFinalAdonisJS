import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "question": "¿que dia es hoy?",
    "options": [
        {
            "opcion":"esta es correcta",
            "iscorrect":true
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        } ]
}
  const response = await client.post('/api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('Fail Create question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "questio": "¿que dia es hoy?",
    "option": [
        {
            "opcion":"esta es correcta",
            "iscorrect":true
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        } ]
}

  const response = await client.post('/api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(400)
  assert.isObject(response.body())
})

test('get questions', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const response = await client.get('/api/v1/questions/getQuestions').header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('update question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 1
  const body = {
    "question":"¿Cuantos años tiene?"
}
  const response = await client.put(`/api/v1/questions/update/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail update question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 100
  const body = {
    "question":"¿Cuantos años tiene?"
  }
  const response = await client.put(`/api/v1/questions/update/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('option question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 1
  const response = await client.get(`/api/v1/questions/getOptions/${idUpdateQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})


test('fail option question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 100
  const response = await client.get(`/api/v1/questions/getOptions/${idUpdateQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('update answer', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 1
  const body = {
              "opcion":"esta es correcta",
              "iscorrect":true
            }
  const response = await client.put(`/api/v1/questions/updateAnswer/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('fail update answer', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 200
  const body = {
              "option":"esta es correcta", //LOS CAMPOS OPTION Y ISCORRECT MAL ESCRITOS
              "iscorrect":true
            }
  const response = await client.put(`/api/v1/questions/updateAnswer/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Delete question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteQuestion = 1
  const response = await client.delete(`/api/v1/questions/delete/${idDeleteQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail delete question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteQuestion = 100
  const response = await client.delete(`/api/v1/questions/delete/${idDeleteQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

