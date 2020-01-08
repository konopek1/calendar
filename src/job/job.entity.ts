import {Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import UserEntity from "../user/user.entity";

@Entity()
class JobEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type?: string;

    @Column()
    text: string;

    @Column({nullable:true})
    prio?: number;

    @Column({nullable:true})
    deadLine?: Date;

    @Column()
    day: Date;

    @ManyToOne(() =>UserEntity, (user: UserEntity) => user.jobs)
    user: UserEntity;
}

export default JobEntity;