import { test } from '@japa/runner'
import { obtenerTokenAutorizacion } from './testAuths'

test('Create Admin', async ({client, assert}) => {
  const body = {
    firstName: 'Rodrigo',
    secondName: 'Mario',
    surname: "Perez",
    secondSurName: "Rodriguez",
    typeDocument: 1,
    documentNumber: "453456546",
    email: "rodrigo@gmail.com",
    password: "user3434",
    phone: "3284537854"
  }
  const response = await client.post('/api/v1/user/createAdmin').json(body)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Create user', async ({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    firstName: 'Carlos',
    secondName: 'Dario',
    surname: "Fuentes",
    secondSurName: "Pulgarin",
    typeDocument: 2,
    documentNumber: "38439432",
    email: "Carlos@gmail.com",
    password: "fjkaefin32",
    rol: 2,
    phone: "3134657899"
  }

  const response = await client.post('/api/v1/user/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('Fail Create Admin', async({client, assert}) => {
  const body = {
    firstName: 'Rodrigo',
    secondName: 'Mario',
    surname: "Perez",
    secondSurName: "Rodriguez",
    typeDocument: 1,
    documentNumber: "453456546",
    email: "rodrigo@gmail.com", //TIPO DE DOCUMENTO Y CORREO YA ESTÁN CREADOS
    password: "f4f4fwew2",
    phone: "3284537854"
  }

  const response = await client.post('/api/v1/user/createAdmin').json(body)
    response.assertStatus(400)
    assert.isObject(response.body())
})


test('Fail Create user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const body = {
    firstName: 'Carlos',
    secondName: 'Dario',
    surname: "Fuentes",
    secondSurName: "Pulgarin",
    typeDocument: 2,
    documentNumber: "38439432", //TIPO DE DOCUMENTO Y CORREO YA ESTÁN CREADOS
    email: "Carlos@gmail.com",
    password: "fef4geswg",
    rol: 2,
    phone: "3134657899"
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

test('get user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUser = 2
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

// test('update user', async({client, assert}) => {
//   const token = await obtenerTokenAutorizacion()
//   const idUpdateUser = 2
//   const body = {
//     firstName: 'Carlos',
//     secondName: 'Mario',
//     surname: "Fuentes",
//     secondSurName: "Pulgarin",
//     typeDocument: 2,
//     documentNumber: "38439432", 
//     email: "Carlos@gmail.com",
//     phone: "3134657899"
//   }
//   const response = await client.put(`/api/v1/user/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
//     response.assertStatus(200)
//     assert.isObject(response.body())
// })

test('Fail update user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUpdateUser = 2
  const body = {
    firstName: 'Carlos',
    secondName: 'Mario',
    surname: "Fuentes",
    secondSurName: "Pulgarin",
    typeDocument: 2,
    documentNumber: "38439432", 
    email: null, //CORREO NO PUEDE SER NULO
    phone: "3134657899"
  }
  const response = await client.put(`/api/v1/user/update/${idUpdateUser}`).json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('Change state user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idUser = 2
  const body = {
    state: false  
  }
const response = await client.post(`/api/v1/user/state/${idUser}`).json(body).header('Authorization', `Bearer ${token}`)
  response.assertStatus(200)
  assert.isObject(response.body())
})

test('Fail change state user', async({client, assert}) => {
  const token = await obtenerTokenAutorizacion()
  const idQuestion = 100 //NO EXISTE EL USUARIO CON ID 100
  const body = {
    state: false  
  }
  const response = await client.post(`/api/v1/user/state/${idQuestion}`).json(body).header('Authorization', `Bearer ${token}`)
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
  const idDeleteUser = 100 //ID DE USUARIO NO EXISTENTE
  const response = await client.delete(`/api/v1/user/delete/${idDeleteUser}`).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

