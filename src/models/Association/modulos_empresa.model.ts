//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import Modulo  from '../modulo.model';
import  Empresa from '../empresa.model';

@Entity('modulos_empresa')
export default class ModulosEmpresa extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Empresa, empresa => empresa.modulosEmpresa) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'empresa_id' }) // Especifique a coluna de chave estrangeira
  empresa: Empresa | undefined; // Associe esta propriedade à entidade Empresa


  @ManyToOne(() => Modulo, modulo => modulo.modulosEmpresas) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'modulo_id' }) // Especifique a coluna de chave estrangeira
  modulo: Modulo | undefined;
}
