//@ts-nocheck
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import  TokenTypes  from '../config/tokens'
import { User } from './user.model'

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Column()
  token!: string;

  
  // @ManyToOne(() => User)
  // @JoinColumn()
  @Column(() => User)
  user: User;

 
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