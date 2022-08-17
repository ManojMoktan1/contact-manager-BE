import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("contact", table => {
        table.increments("id");
        table.string("name").notNullable()
        table.string("phone").notNullable();
        table.string("photograph").notNullable();
        table.string("email");
        table.string("address");
        table.string("cloudinary_id");
        table.boolean("is_favourite_contact").defaultTo(false);
        table
          .integer("user_id")
          .notNullable()
          .references("id")
          .inTable("user_account")
          .onDelete("CASCADE");
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("contact");
}

