//@ts-nocheck
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    BaseEntity,
  } from 'typeorm';
  
  
  
  @Entity('empresas')
  export default class Empresa extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    razao_social!: string;
  
    @Column()
    nome_fantasia!: string;
  
    @Column({unique: true})
    cnpj!: string;
  
    @Column()
    responsavel!: string;
  }