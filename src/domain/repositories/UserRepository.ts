// Esta es la interfaz de repositorio para la entidad User. Define los métodos que el repositorio debe implementar.

// El metodo findByUsername recibe un username y retorna una promesa que resuelve a un User o null.
// El metodo save recibe un User y retorna una promesa que resuelve a void.

import { Error } from "../entities/Error";
import { User } from "../entities/User";

export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  updateStatus(id: string): Promise<boolean | null>;
  save(user: User): Promise<User | Error>;
}
