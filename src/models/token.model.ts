
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import  TokenTypes  from '../config/tokens'
import  User  from './user.model'

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column()
  token!: string;

  
  @ManyToOne(() => User, user => user.tokens) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'user_id' }) // Especifique a coluna de chave estrangeira
  user: User | undefined; // Associe esta propriedade à entidade User

 
  @Column({
    type: 'enum',
    enum: TokenTypes,
  })
  type!: TokenTypes

 
  @Column()
  expires!: Date;


  @Column()
  blacklisted!: boolean;
}

export default Token;