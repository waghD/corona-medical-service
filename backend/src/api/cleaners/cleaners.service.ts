import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCleaner, Cleaner, UpdateCleaner } from './cleaner.dto';

@Injectable()
export class CleanersService {
  constructor(private db: DatabaseService) {}

  async createCleaner(cleaner: CreateCleaner): Promise<Cleaner> {
    const clean = new Cleaner();
    clean.name = cleaner.name;
    clean.surname = cleaner.surname;
    return this.db.saveCleaner(clean);
  }

  async updateCleaner(id: number, clean: UpdateCleaner): Promise<Cleaner> {
    const cleaner = await this.db.getCleanerById(id);
    if (clean.name) {
      cleaner.name = clean.name;
    }

    if (clean.surname) {
      cleaner.surname = clean.surname;
    }

    return this.db.saveCleaner(cleaner);
  }

  async deleteCleaner(id: number): Promise<Cleaner> {
    const cleaner = await this.db.getCleanerById(id);
    await this.db.deleteCleaner(id);
    return cleaner;
  }
}
