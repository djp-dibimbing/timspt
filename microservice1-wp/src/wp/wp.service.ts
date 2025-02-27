import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Wp } from "./wp.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class WpService {
    constructor(
        @InjectRepository(Wp)
        private wpRepo: Repository<Wp>
    ) { }

    async createWP(firstname: string,
        lastname: string,
        email: string,
        username: string,
        password: string,
        nik: string,
        npwp: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const wp = this.wpRepo.create({ firstname, lastname, email, username, password: hashedPassword, nik, npwp });
        return this.wpRepo.save(wp);
    }

    async findByEmail(email: string) {
        return this.wpRepo.findOne({ where: { email } });
    }

    async updateWP(id: number, updateData: Partial<Wp>): Promise<Wp> {
        const wp = await this.wpRepo.findOne({ where: { id } });
        if (!wp) {
            throw new NotFoundException('User not found');
        }

        Object.assign(wp, updateData); // Update only provided fields
        return this.wpRepo.save(wp);
    }
}