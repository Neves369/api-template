//@ts-nocheck
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import Empresa from './empresa.model';
import PerfilAcesso from './perfilAcesso.model';

enum TipoSexo {
  Masculino = 'MASCULINO',
  Feminino = 'FEMININO',
  Outro = 'OUTRO',
}


@Entity('gestao.usuarios')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  nome_usuario!: string;

  @Column()
  nome!: string;

  @Column({unique: true})
  cpf!: string;

  @Column()
  telefone!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  senha!: string;

  @Column({
    type: 'enum',
    enum: TipoSexo,
    default: TipoSexo.Masculino,
    name: 'sexo',
  })
  sexo!: string;
 

  @Column({
    default: 'user' as roles,
    length: 30,
  })
  role!: string;


  @Column()
  @CreateDateColumn()
  data_cadatro!: Date;

  @Column()
  @UpdateDateColumn()
  data_ultima_atualizacao!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_ultima_alteracao_id' })
  usuarioUltimaAlteracao: Usuario | undefined;

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: 'empresa_id' })
  empresa!: Empresa;

  @ManyToOne(() => PerfilAcesso)
  @JoinColumn({ name: 'perfil_acesso_id' })
  perfilAcesso!: PerfilAcesso;

  @Column({default: true})
  status!: boolean;
}