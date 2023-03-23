import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import Question from 'App/Models/Question'

export default class QuestionsController {
    public async createQuestion({request, response}: HttpContextContract) {
        const question = await request.input('question')
        const options = await request.input('options')
        try {
            const newQuestion = new Question()
            newQuestion.question = question
            await newQuestion.save()
            
            options.forEach( async (element) => {
                const newAnswers = new Answer()
                newAnswers.answer = element.opcion
                newAnswers.isCorrect = element.iscorrect
                newAnswers.questionId = newQuestion.id    
                await newAnswers.save()
            })

            return response.status(200).json({
                'state': true,
                'message': 'Pregunta creada exitosamente'
            })
         
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'Error al crear la pregunta'
            })

        }
    }

    public async getQuestions(): Promise<any> {
        try {
            const questions = await Question.query().select('question', 'id')
            return {
                'state': true,
                'questions': questions
            }
        } catch (error) {
            return {
                'state': false,
                'message': 'Error al listar las preguntas'
            }
        }
    }

    public async deleteQuestion({request, response}: HttpContextContract) {
        const idQuestion = request.param('id')
        try {
            await Question.findByOrFail('id', idQuestion)
            await Answer.query().where('questionId', idQuestion).delete()
            await Question.query().where('id', idQuestion).delete()
            return response.status(200).json({
                'state': true,
                'message': 'Pregunta Eliminada con exito'
            })
        
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'Error al eliminar la pregunta'
            })
        }
    }

    public async updateQuestion({request, response}: HttpContextContract) {
        const newQuestion = request.input('question')
        const idQuestion = request.param('id')
        try {
            const question = await Question.findByOrFail('id', idQuestion)
            question.question = newQuestion
            await question.save()
            return response.status(200).json({
                'state': true,
                'message': 'Pregunta Editada con exito'

            })   
        
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'Error al editar la pregunta'
            })
        }
    }

    public async disableQuestion({request, response}: HttpContextContract) {
        const idQuestion = await request.param('id')
        try {
            const question = await Question.findByOrFail('id', idQuestion)
            question.state = false
            await question.save()
            const answers = await Answer.query().where('question_id', idQuestion)
            answers.map(async element => {
                element.state = false
                await element.save()
            })
            return response.status(200).json({
                'state': true,
                'message': 'Pregunta deshabilitada con exito'
            })
        } catch (error) {
            return response.status(400).json({
                'state': false,
                'message': 'No se pudo deshabilitar la pregunta'
            })
        }
    }
}
