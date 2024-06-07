import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'lastName', 'email', 'password', 'role'],
    });
  }

  async findAll(id :number) {
    const user = await this.userRepository.findOne({ where: { id },
      select: ['id', 'name', 'lastName', 'email', 'password', 'role'],
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    if(user.role === 'admin') {
      return this.userRepository.find();
    } else {
      return [user];
    }
  }
  

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, data: Partial<User>): Promise<void> {
    try {
      await this.userRepository.update(id, data);
    } catch (error) {
      console.error("Error al actualizar el usuario en el servicio:", error);
      throw new Error("No se pudo actualizar el usuario en el servicio.");
    }
  }
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByResetPasswordToken(token: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { resetPasswordToken: token } } as FindOneOptions<User>);

  }
  
  async updateResetPasswordToken(email: string, resetToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      user.resetPasswordToken = resetToken;
      await this.userRepository.save(user);
    }
  }
}