import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
const bcrypt = require('bcryptjs')

export default class UsersController {
    public async createUser({request, response}: HttpContextContract) {
        const dataUser = request.all()
        try {
            const salt = bcrypt.genSaltSync()
            const newUser = new User()
            newUser.firstName = dataUser.firstName
            newUser.secondName = dataUser.secondName
            newUser.surname = dataUser.surname
            newUser.secondSurname = dataUser.secondSurName
            newUser.typeDocument = dataUser.typeDocument
            newUser.documentNumber = dataUser.documentNumber
            newUser.email = dataUser.email
            newUser.password = bcrypt.hashSync(dataUser.password, salt)
            newUser.rolId= dataUser.rol
            newUser.phone = dataUser.phone
            await newUser.save()
            return response.status(200).json({
                'state': true,
                'message': 'Estudiante creado correctamente'
            })
        } catch (error) {
            return response.status(400).json({
                'status': false,
                'message': 'Fallo en la creación del estudiante '
            })
        }
    }

    public async loginUser({request, response}: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        try {
            const user = await User.findByOrFail('email', email)
            const validPassword = bcrypt.compareSync(password, user.password)
            if (! validPassword) throw Error
            const payload = {
                'id': user.id,
                'name': user.email,
                'role': user.rolId,
            }
            const token: string = this.generarToken(payload)
            const name = `${user.firstName} ${user.secondName} ${user.surname} ${user.secondSurname}`
            return response.status(200).json({
                "state": true,
                "id": user.id,
                "name": name,
                "role": user.role,
                'mesagge': 'Ingreso exitoso',
                token,
                
            }) 
        } catch (error) {
            
            return response.status(400).json({
                "state": false,
                "message": "constraseña o email invalido "            
            })  
        }
    }

    public generarToken(payload: any):string{
        const opciones = {
          expiresIn: '60 mins'
        }
        return jwt.sign(payload, Env.get('JWT_SECRET_KEY'), opciones)   
    } 

    public static verificarToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1]
        jwt.verify(token, Env.get('JWT_SECRET_KEY'), (error)=>{
            if(error){
                throw new Error('Token expirado');
                
            }
        })
        return true
      }
      
      public static obtenerPayload (authorizationHeader:string) {
        let token = authorizationHeader.split(' ')[1]
        const payload = jwt.verify(token, Env.get('JWT_SECRET_KEY'), {complete: true}).payload
        return payload
      }

    public async getUsers({response}: HttpContextContract):Promise<any> {
        try {
            const users = await User.query()
                .join('roles', 'users.rol_id', 'roles.id')
                .where('roles.id', 2)
                .select('firstName','secondName','surname','secondSurname', 'typeDocument', 'documentNumber', 'email', 'phone')
            return response.status(200).json({
                'state': true,
                'message': 'Listado de estudiantes',
                users
            })
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                'state': false,
                'message': 'Fallo en el listado de estudiantes'
            })
        }
    }


    public async updateUser({request, response}: HttpContextContract) {
        const newData = request.all()
        const idUser = request.param('id')
        try {
            const user = await User.findByOrFail('id', idUser)
            user.firstName = newData.firstName
            user.secondName = newData.secondName
            user.surname = newData.surname
            user.secondSurname = newData.secondSurName
            user.typeDocument = newData.typeDocument
            user.documentNumber = newData.documentNumber
            user.email = newData.email
            user.phone = newData.phone
            await user.save()
            return response.status(200).json({
                'state': true,
                'message': 'Se actualizo correctamente'
            }) 
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'Error al actualizar'
            })
        }
    }

    public async deleteUser({request, response}: HttpContextContract) {
        const idUser = request.param('id')
        try {
            await User.findByOrFail('id', idUser)
            await User.query().where('id', idUser).delete()
            return response.status(200).json({
                'state': true,
                'message': 'Eliminado con exito' 
            })
        } catch (error) {
            return response.status(400).json({
            'state': false,
            'message': 'Error al eliminar'
            })
        }
    }

    public async getUser({request, response}: HttpContextContract) {
        const idUser = request.param('id') 
        try {
            const {firstName,secondName,surname,
                secondSurname: secondSurName, typeDocument, documentNumber, 
                email, phone} = await User.findByOrFail('id', idUser)

            return response.status(200).json({
                firstName,secondName,surname,
                secondSurName, typeDocument, documentNumber, 
                email, phone
            })
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'Error al consultar el detalle del usuario'
            })
        }
    }
}
