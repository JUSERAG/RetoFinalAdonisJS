import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create type document', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "name": "CC extrangera"
}
  const response = await client.post('/api/v1/typeDocument/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail Create type document', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "nam": "T.I." //EL CAMPO NAME MAL ESCRITO
}
  const response = await client.post('/api/v1/typeDocument/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('get type document', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const response = await client.get('/api/v1/typeDocument/getTypeDocuments').header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isArray(response.body())
})

test('update type document', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateTypeDocument = 3
    const body = {
      "name": "CC extranjera"
 }
  const response = await client.put(`/api/v1/typeDocument/update/${idUpdateTypeDocument}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail update type document', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateUser = 100
  const body = {
    "nam": "T.I." //EL CAMPO NAME MAL ESCRITO
 }
  const response = await client.put(`/api/v1/typeDocument/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Delete type document', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 3
  const response = await client.delete(`/api/v1/typeDocument/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail delete type document', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 100
  const response = await client.delete(`/api/v1/typeDocument/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

