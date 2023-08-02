import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DBTables } from "../../constants/DBTable";

@Entity(DBTables.AUTHORS)
export class Author{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    email:string

    @Column({nullable:true})
    bio:string

    @Column({nullable:true})
    image:string

}

