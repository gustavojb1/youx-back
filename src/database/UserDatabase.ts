import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "users";

  
  public async findUsers(): Promise<UserDB[]> {
    const usersDB: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    );

    return usersDB;
  }

  
  public async findPatients(): Promise<UserDB[]> {
    const patientsDB: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ role_id: "role_paciente" });

    return patientsDB;
  }

  
  public async findNurses(): Promise<UserDB[]> {
    const nursesDB: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    ).where({ role_id: "role_enfermeiro" });

    return nursesDB;
  }

  
  public async createUser(user: UserDB): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(user);
  }

  
  public async findUserByEmail(email: string): Promise<UserDB | undefined> {
    const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ email });

    return userDB;
  }

  
  public async findUserById(id: string): Promise<UserDB | undefined> {
    const [userDB] = await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .select()
      .where({ id });

    return userDB;
  }

  
  public async deleteUser(id: string): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .delete()
      .where({ id });
  }

  
  public async editUser(id: string, user: Partial<UserDB>): Promise<void> {
    await BaseDatabase.connection(UserDatabase.TABLE_USERS)
      .update(user)
      .where({ id });
  }
}
