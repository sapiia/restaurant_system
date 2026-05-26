import { AppDataSource } from '../config/database.js';
import { Users } from '../entities/Users.js';

export class UserRepository {
    private repo = AppDataSource.getRepository(Users);

    async findAll(): Promise<Users[]> {
        return this.repo.find();
    }

    async findByEmail(email: string): Promise<Users | null> {
        return this.repo.findOne({ where: { email } });
    }

    async findById(id: string): Promise<Users | null> {
        return this.repo.findOne({ where: { id } });
    }

    async create(data: Partial<Users>): Promise<Users> {
        const user = this.repo.create(data);
        return this.repo.save(user);
    }

    async update(id: string, data: Partial<Users>): Promise<Users | null> {
        await this.repo.update(id, data);
        return this.findById(id);
    }
}
