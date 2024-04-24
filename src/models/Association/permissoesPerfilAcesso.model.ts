//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity, JoinColumn } from 'typeorm';
import Permissao  from '../permissao.model';
import  PerfilAcesso from '../perfilAcesso.model';

@Entity('permissoes_sperfil_acesso')
export default class PermissoesPerfilAcesso extends BaseEntity{
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Permissao, permissao => permissao.PermissoesPerfilAcesso) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'permissao_id' }) // Especifique a coluna de chave estrangeira
  permissao: Permissao | undefined; // Associe esta propriedade à entidade Permissao


  @ManyToOne(() => PerfilAcesso, perfilAcesso => perfilAcesso.PermissoesPerfilAcesso) // Especifique a relação ManyToOne
  @JoinColumn({ name: 'perfil_acesso_id' }) // Especifique a coluna de chave estrangeira
  perfilAcesso: PerfilAcesso | undefined;
}
