import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    lastName: string;
  
    @Column({ unique: true, nullable: false })
    email: string;
  
    @Column({ nullable: false, select: false })
    password: string;
  
    @Column({
      type: 'uuid',
      unique: true,
      name: 'reset_password_token',
      nullable: true,
    })
    resetPasswordToken: string;
  

    @Column({ default: 'user' })
    role: string;
  
    @DeleteDateColumn()
    deletedAt: Date;
    
  }