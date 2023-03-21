import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Question from './Question'

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public answer: string
  @column() public isCorrect: boolean
  @column() public questionId: number
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (() => Question, {
    localKey: 'questionId',
    foreignKey: 'id'
  })
  public question: HasMany<typeof Question>
}

