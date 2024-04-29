
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import User from './usuario.model';
import Empresa from './empresa.model';
  


  
@Entity('gestao.perfis_acesso')
export default class PerfilAcesso extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    descricao!: string;
  
    @Column()
    @CreateDateColumn()
    data_criacao!: Date;
  
    @Column()
    @UpdateDateColumn()
    data_ultima_atualizacao!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_criacao_id' })
    usuarioCriacao: User | undefined;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: 'usuario_ultima_alteracao_id' })
    usuarioUltimaAlteracao: User | undefined;

    @ManyToOne(() => Empresa)
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresa | undefined;
  
    @Column({default: true})
    status!: boolean;
  
  }
  