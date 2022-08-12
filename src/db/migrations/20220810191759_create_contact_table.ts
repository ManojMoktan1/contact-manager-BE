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
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("contact");
}

