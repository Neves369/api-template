// @ts-nocheck
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import  TokenTypes  from '../config/tokens'
import  User  from './usuario.model'

@Entity('gestao.tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column()
  token!: string;

  
  @ManyToOne(() => User, user => user.tokens) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'usuario_id' }) // Especifique a coluna de chave estrangeira
  usuario: User | undefined; // Associe esta propriedade à entidade User

 
  @Column({
    type: 'enum',
    enum: TokenTypes,
  })
  tipo!: TokenTypes

 
  @Column()
  expiracao!: Date;


  @Column({name: 'lista_negra'})
  listaNegra!: boolean;
}

export default Token;