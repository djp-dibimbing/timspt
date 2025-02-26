import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Wp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column ()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    nik: string;

    @Column()
    npwp: string;
}