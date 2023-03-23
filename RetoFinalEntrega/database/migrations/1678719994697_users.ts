import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 255)
      table.string('second_name', 255)
      table.string('surname', 180)
      table.string('second_surname', 180)
      table.integer('type_document').references('id').inTable('types_documents').notNullable()
      table.string('document_number').notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.integer('rol_id').references('id').inTable('roles').notNullable()
      table.string('phone', 180)
      table.boolean('state').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
