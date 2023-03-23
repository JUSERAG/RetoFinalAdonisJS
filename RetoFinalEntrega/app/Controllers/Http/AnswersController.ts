import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'

export default class AnswersController {

    public async updateAnswer({request, response}: HttpContextContract) {
        const option = await request.input('opcion')
        const isCorrect = await request.input('iscorrect')
        const idAnswer = await request.param('id')
        try {
            const updateAnswer = await Answer.findByOrFail('id', idAnswer)
            updateAnswer.answer = option
            updateAnswer.isCorrect = isCorrect
            await updateAnswer.save()

            return response.status(200).json({
                "state": true,
                "message": "opcion Editada con exito"                   
            })   

        
        } catch (error) {
            console.log(error)
            return response.status(400).json({
                "state": false,
                "message": "Error al editar la opcion"            
            })  
        }
    }

    public async getOptionQuestion({request, response}: HttpContextContract){
        const question = request.param('id')
        try {
            await Answer.findByOrFail('questionId', question)
            const options = await Answer.query().where('questionId', question).select('id','answer')
            return response.status(200).json({
                "state": true,
                "message": "Listado de opciones",
                options
            })
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "Error al obtener el listado de opciones"
            })
        }
    }
}