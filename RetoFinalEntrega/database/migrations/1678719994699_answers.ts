import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('answer').notNullable()
      table.boolean('is_correct').notNullable()
      table.integer('question_id').references('id').inTable('questions').notNullable()
      table.boolean('state').defaultTo(true)
      table.timestamps(true)
    })
  }  

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
