import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create user', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    firstName: 'Fabiana',
    secondName: 'Maria',
    surname: "Osorio",
    secondSurName: "Naranjo",
    typeDocument: 2,
    documentNumber: "1002619230",
    email: "Fabiana@gmail.com",
    password: "12345",
    rol: 2,
    phone: "3124628571"
  }
  const response = await client.post('/api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail Create user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    firstName: 'Juan',
    secondname: 'Sebastian',
    surname: "Ramirez",
    secondSurName: "Aguirre",
    typeDocument: 1,
    documentNumbe: "1002547615", 
    emai: "sebas@gmail.com", 
    password: "12345",
    rolId: 1,
    phone: "3235095579"
  }

  const response = await client.post('/api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('get users', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const response = await client.get('/api/v1/user/getUsers').header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('update user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateUser = 2
  const body = {
    firstName: 'Carlos',
    secondName: 'Alejandro',
    surname: "Morales",
    secondSurName: "Paez",
    typeDocument: 1,
    documentNumber: "1002678076",
    email: "carlos@gmail.com",
    phone: "35479654322"
  }
  const response = await client.put(`/api/v1/user/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail update user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateUser = 100
  const body = {
    firstName: 'Carlos',
    secondName: 'Alejandro',
    surname: "Morales",
    secondSurName: "Paez",
    typeDocument: 1,
    documentNumber: "1002678076",
    email: null,
    phone: "35479654322"
  }
  const response = await client.put(`/api/v1/user/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Delete user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 2
  const response = await client.delete(`/api/v1/user/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail delete user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idDeleteUser = 100
  const response = await client.delete(`/api/v1/user/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('get user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUser = 1
  const response = await client.get(`/api/v1/user/getUser/${idUser}`).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('Fail get user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUser = 100
  const response = await client.get(`/api/v1/user/getUser/${idUser}`).header('Authorization', `Bearer ${token}`)
  response.assertStatus(400)
  assert.isObject(response.body())
})