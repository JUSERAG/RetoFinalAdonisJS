import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypesDocuments extends BaseSchema {
  protected tableName = 'types_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable().unique()
      table.boolean('state').defaultTo(true)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
