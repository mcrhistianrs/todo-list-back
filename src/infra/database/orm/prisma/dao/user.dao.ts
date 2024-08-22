import { User } from '@prisma/client';
import { PrismaService } from '../service/prisma.service';
interface IUserDao {
  findByEmail(email: string): Promise<User | null>;
}
class UserDao implements IUserDao {
  constructor(private prismaService: PrismaService) {}
  async findByEmail(email: string): Promise<User> {
    if (!email) {
      return null;
    }
    try {
      return await this.prismaService.user.findUnique({
        where: { email },
      });
    } catch (error) {
      return null;
    }
  }
}
export { UserDao };
