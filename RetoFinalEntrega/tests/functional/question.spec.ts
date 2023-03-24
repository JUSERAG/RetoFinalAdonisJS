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
    "question": null, //EL CAMPO 'question' NO PUEDE SER NULO
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
  const response = await client.put(`/api/v1/questions/updateQuestion/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail update question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 100 //NO EXISTE PREGUNTA CON ID 100
  const body = {
    "question":"¿Cuantos años tiene?"
  }
  const response = await client.put(`/api/v1/questions/updateQuestion/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Change state question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idQuestion = 1
  const body = {
    state: false  
  }
  const response = await client.post(`/api/v1/questions/stateQuestion/${idQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('Fail change state question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idQuestion = 100 //NO EXISTE LA PREGUNTA 100
  const body = {
    state: false  
  }
  const response = await client.post(`/api/v1/questions/stateQuestion/${idQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(400)
  assert.isObject(response.body())
})

test('option question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idGetQuestion = 1
  const response = await client.get(`/api/v1/questions/getOptions/${idGetQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})


test('fail option question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idGetQuestion = 100 //NO EXISTE PREGUNTA CON ID 100
  const response = await client.get(`/api/v1/questions/getOptions/${idGetQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('update answer', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateAnswer = 1
  const body = {
              "opcion":"esta es correcta",
              "iscorrect":true
            }
  const response = await client.put(`/api/v1/questions/updateAnswer/${idUpdateAnswer}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('fail update answer', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateQuestion = 100 //NO EXISTE OPCIÓN DE RESPUESTA CON ID 100
  const body = {
                  "opcion":"esta es correcta",
                  "iscorrect":true
                }
  const response = await client.put(`/api/v1/questions/updateAnswer/${idUpdateQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Delete question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteQuestion = 1
  const response = await client.delete(`/api/v1/questions/deleteQuestion/${idDeleteQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail delete question', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteQuestion = 100 //NO EXISTE PREGUNTA CON ID 100
  const response = await client.delete(`/api/v1/questions/deleteQuestion/${idDeleteQuestion}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

