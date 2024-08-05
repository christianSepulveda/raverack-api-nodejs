import { UserRepository } from "../../../domain/repositories/UserRepository";

export class UpdateStatus {
  private userRepostiroty: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepostiroty = userRepository;
  }

  async execute(id: string): Promise<boolean | null> {
    const result = await this.userRepostiroty.updateStatus(id);
    return result;
  }
}
