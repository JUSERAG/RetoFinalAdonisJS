import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer'
import Form from 'App/Models/Form'
import Question from 'App/Models/Question'

export default class FormsController {
    public async createForm({request, response}: HttpContextContract){
        const studentId = await request.input('studentId')
        const answers = await request.input('answers')
        try {
            const newForm = new Form()
            newForm.studentId = studentId
            newForm.answerId = answers
            await newForm.save()
            return response.status(200).json({
                "state": true,
                "message": "Respuestas almacenadas con exito"
            })
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "No se pudieron almacenar las respuestas"
            }) 
        }

    }

    public async getForm({request, response}: HttpContextContract) {
            const idForms = request.param('id')
            try{
                const form = await Form.findByOrFail('id', idForms)
                const formAnswers = form.answerId
                const idAnswers:any = formAnswers.match(/\d+/g) //LAS OPCIONES DE RESPUESTAS POR CADA FORMULARIO SON CONVERTIDAS A OBJETO
                const idQuestions = await Answer.query().whereIn('id', [...idAnswers]).distinct('questionId').select('questionId') //OBTIENE TODOS LOS ID'S DIFERENTES DE PREGUNTAS 
                const listIdQuestions:number[] = idQuestions.map(element => {                                                //POR MEDIO DEL IDQUESTION DE LAS OPCIONES DE RESPUESTA
                    return element.questionId //ALMACENA SOLO EL IDQUESTION EN UN ARREGLO
                })
                const questions = await Question.query().whereIn('id', [...listIdQuestions]).preload('answer', sql => { //BUSCA TODAS LAS PREGUNTAS CON SUS OPCIONES DE RESPUESTA 
                        sql.select('id', 'answer')                                                                      //POR MEDIO DEL ARREGLO PREVIAMENTE CREADO
                    } ).select('question', 'id') 
                    
                return response.status(200).json({
                    'state': true,
                    questions
                })
        } catch (error) {
            return response.status(400).json({
                "state": false,
                "message": "Error al obtener el listado"        
            })
        }
    }

    public async getForms({response}: HttpContextContract) {

        try{
            const questionsId = Answer.query()
                .join('questions', 'answers.question_id', 'questions.id')
                .distinct()
                .select('question_id')
            const listQuestionId:number[] = (await questionsId).map(element => {
                return element.questionId
            })
            const questions = await Question.query().whereIn('id', [...listQuestionId]).preload('answer', sql => { //BUSCA TODAS LAS PREGUNTAS CON SUS OPCIONES DE RESPUESTA 
                sql.select('id', 'answer')                                                                      //POR MEDIO DEL ARREGLO PREVIAMENTE CREADO
            } ).select('question', 'id') 

            return {
                "state": true,
                questions
        
            }
    } catch (error) {
        return response.status(400).json({
            "state": false,
            "message": "Error al obtener el listado"        
        })
    }
}
}

