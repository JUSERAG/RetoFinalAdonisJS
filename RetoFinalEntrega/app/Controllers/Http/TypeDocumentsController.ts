import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeDocument from 'App/Models/TypesDocument'

export default class TypeDocumentsController {
    public async createTypeDocument({request, response}: HttpContextContract) {
        const name = await request.input('name')
        try {
            const newDocument = new TypeDocument() 
            newDocument.name = name
            await newDocument.save()
            return response.status(200).json({
                "state": true,
                "message": "Tipo documento creado con exito"

            })  
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "No se pudo crear el tipo documento"

            })  

        }
    }

    public async getTypeDocuments(): Promise<any> {
        try {
            return await TypeDocument.query().select('id', 'name')
        } catch (error) {
            return {
                "state": false,
                "message": "Error al listar los tipos de documentos",

            }
        }
    }

    public async deleteTypeDocument({request, response}: HttpContextContract) {
        const idTypeDocument = request.param('id')
        try {
            await TypeDocument.findByOrFail('id', idTypeDocument)
            await TypeDocument.query().where('id', idTypeDocument).delete()
            return response.status(200).json({
                "state": true,
                "message": "Tipo de documento eliminado con exito"

            })
           
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "Error al eliminar el tipo de documento"

            })  
        }
    }

    public async updateTypeDocument({request, response}: HttpContextContract) {
        const newTypeDocument = request.input('name')
        const idTypeDocument = request.param('id')
        try {
            const typeDocument = await TypeDocument.findByOrFail('id', idTypeDocument)
            typeDocument.name = newTypeDocument
            await typeDocument.save()
            return response.status(200).json({
                "state": true,
                "message": "Tipo de documento actualizado con exito"

            })   
        
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "Error al actualizar el tipo de documento"

            })  
        }
    }


}
