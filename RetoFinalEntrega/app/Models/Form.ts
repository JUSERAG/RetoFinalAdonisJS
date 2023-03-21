import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import User from './User'


export default class Form extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public studentId: number
  @column() public answerId: string
  @column() public state: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    localKey: 'studentId',
    foreignKey: 'id'
  })
  public student: HasMany<typeof User> 

}

