import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeDocument from './TypesDocument'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id: number
  @column() public firstName: string
  @column() public secondName: string
  @column() public surname: string
  @column() public secondSurname: string
  @column() public typeDocument: number
  @column() public documentNumber: string
  @column() public email: string
  @column() public password: string
  @column() public rolId: number
  @column() public phone: string
  @column() public state: boolean
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany (() => TypeDocument, {
    localKey: 'type_document',
    foreignKey: 'id',
  })
  public typedocument: HasMany<typeof TypeDocument>

  @hasMany (() => Role, {
    localKey: 'rol_id',
    foreignKey: 'id'
  })
  public role: HasMany<typeof Role>
}
