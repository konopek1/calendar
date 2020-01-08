import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import JobEntity from "../job/job.entity";

@Entity()
class UserEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => JobEntity, (jobEntity: JobEntity) => jobEntity.user)
    jobs: JobEntity;
}

export default UserEntity;