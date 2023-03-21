import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class Admin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader:any = ctx.request.header('authorization')

    try {
      const {id, role} = await UsersController.obtenerPayload(authorizationHeader)
      const user = await User.find(id)
      if (!user){
        return ctx.response.status(401).json({
          'msg': 'Token no valido'})
      }
      if(role !== 1){
        return ctx.response.status(401).json({
          'msg': 'No tiene autorización para está acción'})
      }

      await next()
    } catch (error) {
      return ctx.response.status(400).json({
        'msg': 'Token no valido'})
    }
  }
} 
