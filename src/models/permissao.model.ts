// @ts-nocheck
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from 'typeorm'
  

enum TipoPermissao {
    pesquisarUsuario = 'PESQUISAR_USUARIO',
    cadastrarUsuario = 'CADASTRAR_USUARIO',
    pesquisarPerfilAcesso = 'PESQUISAR_PERFIL_ACESSO',
    cadastrarPerfilAcesso = 'CADASTRAR_PERFIL_ACESSO',

}
  
@Entity('permissoes')
export default class Permissao extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
   
    @Column({
        type: 'enum',
        enum: TipoPermissao,
        default: TipoPermissao.pesquisarUsuario,
        name: 'permissao',
      })
    permissao!: string;
  
  }
  