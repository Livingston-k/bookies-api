import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DBTables } from '../../constants/DBTable';

export class CreateAuthorsTable1690891958110 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DBTables.AUTHORS,
                columns:[
                    {
                        name:"id",
                        type:"int",
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    },
                    {
                        name:"name",
                        type:"varchar",
                        length:"255",
                        isNullable:false
                    },
                    {
                        name:"email",
                        type:"varchar",
                        length:"255",
                        isNullable:false,
                        isUnique:true
                    },
                     {
                        name:"bio",
                        type:"text",
                        isNullable:true,
                    }, {
                        name:"image",
                        type:"varchar",
                        length:"255",
                        isNullable:true,
                    },
                    {
                        name:"createdAt",
                        type:"datetime",
                        default:"now()",
                        isNullable:true
                    },
                    {
                        name:"updatedAt",
                        type:"datetime",
                        default:"now()",
                        isNullable:true
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DBTables.AUTHORS)
    }


}
