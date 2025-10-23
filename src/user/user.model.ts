import { Column, Model, Table } from "sequelize-typescript";

@Table({timestamps: true, modelName: "user"})
export class user extends Model {

    @Column({allowNull: false})
    usernname: string

      @Column({allowNull: false})
    email: string

      @Column({allowNull: false})
    password: string

       @Column({allowNull: false})
    age: number

      @Column({allowNull: false})
    img: string



}