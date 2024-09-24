import { UserDatabase } from "../database/UserDatabase";
import {
  GetUserInputDTO,
  GetUserOutputDTO,
  CreateUserInputDTO,
  CreateUserOutputDTO,
  DeleteUserInputDTO,
  UserDTO,
  LoginUserInputDTO,
  LoginUserOutputDTO,
  EditUserInputDTO,
  EditUserOutputDTO,
} from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenPayload, USER_ROLES } from "../types";
import { NotFoundError } from "../errors/NotFoundError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private userDTO: UserDTO,
    private tokenManager: TokenManager,
    private idGenerator: IdGenerator,
    private hashManager: HashManager
  ) {}

  
  public async getUsers(input: GetUserInputDTO): Promise<GetUserOutputDTO[]> {
    const { token } = input;
    const usersDB = await this.userDatabase.findUsers();

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }
    if (payload.role_id !== "role_admin") {
      throw new BadRequestError("Usuário sem permissão");
    }

    const output = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.username,
        userDB.email,
        userDB.password,
        userDB.role_id,
        userDB.created_at
      );

      return this.userDTO.getUserOutput(user);
    });

    return output;
  }

  
  public async getPatients(
    input: GetUserInputDTO
  ): Promise<GetUserOutputDTO[]> {
    const { token } = input;
    const usersDB = await this.userDatabase.findPatients();

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }
    if (payload.role_id !== "role_admin" && payload.role_id !== "role_medico" && payload.role_id !== "role_enfermeiro") {
      throw new BadRequestError("Usuário sem permissão");
    }

    const output = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.username,
        userDB.email,
        userDB.password,
        userDB.role_id,
        userDB.created_at
      );

      return this.userDTO.getUserOutput(user);
    });

    return output;
  }

  
  public async getNurses(input: GetUserInputDTO): Promise<GetUserOutputDTO[]> {
    const { token } = input;
    const usersDB = await this.userDatabase.findNurses();

    const payload = this.tokenManager.getPayload(token);
    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const output = usersDB.map((userDB) => {
      const user = new User(
        userDB.id,
        userDB.username,
        userDB.email,
        userDB.password,
        userDB.role_id,
        userDB.created_at
      );

      return this.userDTO.getUserOutput(user);
    });

    return output;
  }

  
  public async createUser(
    input: CreateUserInputDTO
  ): Promise<CreateUserOutputDTO> {
    const { username, email, password, roleId } = input;

    const userExists = await this.userDatabase.findUserByEmail(email);
    if (userExists) {
      throw new BadRequestError("Email já está em uso.");
    }

    const id = this.idGenerator.generate();
    const createdAt = new Date().toISOString();
    const hashedPassword = await this.hashManager.hash(password);

    const newUser = new User(
      id,
      username,
      email,
      hashedPassword,
      roleId,
      createdAt
    );
    const tokenPayload: TokenPayload = {
      id: newUser.getId(),
      username: newUser.getUsername(),
      role_id: roleId,
    };

    const token = this.tokenManager.createToken(tokenPayload);

    await this.userDatabase.createUser(newUser.toDBModel());

    const userId = newUser.getId();

    return this.userDTO.createUserOutput(token, userId);
  }

  
  public async deleteUser(input: DeleteUserInputDTO): Promise<void> {
    const { token, id } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    if (payload.role_id !== USER_ROLES.ADMIN) {
      throw new BadRequestError("Usuário sem permissão para deletar.");
    }

    console.log(id);

    const userExists = await this.userDatabase.findUserById(id);
    if (!userExists) {
      throw new BadRequestError("Usuário não encontrado.");
    }

    await this.userDatabase.deleteUser(id);
  }

  
  public async loginUser(
    input: LoginUserInputDTO
  ): Promise<LoginUserOutputDTO> {
    const { email, password } = input;

    
    const userDB = await this.userDatabase.findUserByEmail(email);
    if (!userDB) {
      throw new NotFoundError("'email' não encontrado");
    }

    
    const isPasswordCorrect = await this.hashManager.compare(
      password,
      userDB.password
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("'email' ou 'password' incorretos");
    }

    
    const user = new User(
      userDB.id,
      userDB.username,
      userDB.email,
      userDB.password,
      userDB.role_id,
      userDB.created_at
    );

    
    const payload: TokenPayload = {
      id: user.getId(),
      username: user.getUsername(),
      role_id: user.getRoleId(),
    };

    
    const token = this.tokenManager.createToken(payload);

    const userId = user.getId();

    
    const output: LoginUserOutputDTO = {
      token,
      userId,
    };

    return output;
  }

  
  public async editUser(input: EditUserInputDTO): Promise<EditUserOutputDTO> {
    const { token, id, username, email, roleId } = input;

    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("Token inválido");
    }

    if (payload.role_id !== USER_ROLES.ADMIN) {
      throw new BadRequestError("Usuário sem permissão para editar.");
    }

    const userExists = await this.userDatabase.findUserById(id);
    if (!userExists) {
      throw new NotFoundError("Usuário não encontrado.");
    }

    await this.userDatabase.editUser(id, { username, email, role_id: roleId });

    return this.userDTO.editUserOutput("Usuário editado com sucesso");
  }
}
