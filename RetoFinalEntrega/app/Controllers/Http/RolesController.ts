import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'

export default class RolesController {
    public async createRole({request, response}: HttpContextContract) {
        const name = await request.input('name')
        try {
            const newRole = new Role()
            newRole.name = name
            await newRole.save()
            return response.status(200).json({
                "state": true,
                "message": "Rol creado con exito"

            })  

        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "Error al crear el rol"

            })  
        }
    }

    public async getRoles(): Promise<any> {
        try {
            return await Role.query()
        } catch (error) {
            return {
                "state": false,
                "message": "Error al eliminar el rol"
            }
        }
    }

    public async deleteRole({request, response}: HttpContextContract) {
        const idRole = request.param('id')
        try {
            await Role.findByOrFail('id', idRole)
            await Role.query().where('id', idRole).delete()
            return response.status(200).json({
                "state": true,
                "message": "Rol eliminado con exito"

            })
        
        } catch (error) {
            return response.status(400).json({
                "state": true,
                "message": "No se pudo eliminar el rol"

            })
        }
    }

    public async updateRole({request, response}: HttpContextContract) {
        const newRole = request.input('name')
        const idRole = request.param('id')
        try {
            const role = await Role.findByOrFail('id', idRole)
            role.name = newRole
            await role.save()
            
            return response.status(200).json({
                "state": true,
                "message": "Rol actualizado con exito"
            })   
        
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "No se pudo actualizar el rol"

            })
        }
    }


}

