import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Helper, CreateHelper, UpdateHelper } from './helper.dto';

@Injectable()
export class HelpersService {
  constructor(private db: DatabaseService) {}

  async createHelper(cleaner: CreateHelper): Promise<Helper> {
    const help = new Helper();
    help.name = cleaner.name;
    help.surname = cleaner.surname;
    return this.db.saveHelper(help);
  }

  async updateHelper(id: number, help: UpdateHelper): Promise<Helper> {
    const helper = await this.db.getHelperById(id);

    if (help.name) {
      helper.name = help.name;
    }

    if (help.surname) {
      helper.surname = help.surname;
    }

    return this.db.saveCleaner(helper);
  }

  async deleteHelper(id: number): Promise<Helper> {
    const helper = await this.db.getHelperById(id);
    await this.db.deleteHelper(id);
    return helper;
  }
}
