//@ts-nocheck
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  BaseEntity, 
  OneToMany,
  BeforeInsert,
  BeforeUpdate, 
} from 'typeorm';
import { roles } from 'src/config/roles';
import Token from './token.model';



@Entity('users')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  password!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username!: string;

  @Column({
    nullable: true,
  })
  name!: string;

  @Column({
    default: 'user' as roles,
    length: 30,
  })
  role!: string;



  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}