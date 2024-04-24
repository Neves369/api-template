// @ts-nocheck
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from 'typeorm'
  

enum TipoModulo {
    Gestao = 'GESTAO',
    Financeiro = 'FINANCEIRO',
    Operacional = 'OPERACIONAL',
}
  
@Entity('modulos')
export default class Modulo extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
   
    @Column({
        type: 'enum',
        enum: TipoModulo,
        default: TipoModulo.Gestao,
        name: 'modulo',
      })
    modulo!: string;
  
  }
  