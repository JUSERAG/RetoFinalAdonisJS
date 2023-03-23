import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create role', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "name": "teacher"
  }
  const response = await client.post('/api/v1/role/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail Create role', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    "name": "teacher" //SE ACABO DE CREAR EL PERFIL PROFESOR
}
  const response = await client.post('/api/v1/role/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('get role', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const response = await client.get('/api/v1/role/getRoles').header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isArray(response.body())
})

test('update role', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateTypeDocument = 3
  const body = {
    "name": "Teacher"
 }
  const response = await client.put(`/api/v1/role/update/${idUpdateTypeDocument}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail update role', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateUser = 100
  const body = {
    "nam": "Administrador" //EL PERFIL 'Administrador' YA FUE CREADO
 }
  const response = await client.put(`/api/v1/role/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Delete role', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 3
  const response = await client.delete(`/api/v1/role/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail delete role', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 3 //SE ACABO DE ELIMINAR EL PERFIL CON ID 3
  const response = await client.delete(`/api/v1/role/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

