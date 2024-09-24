import { USER_ROLES } from "../types";
import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";



export interface GetUserInputDTO {
  token: string;
}

export interface GetUserOutputDTO {
  id: string;
  username: string;
  role_id: string;
  email: string;
  created_at: string;
}

export interface CreateUserInputDTO {
  username: string;
  email: string;
  password: string;
  roleId: USER_ROLES;
}

export interface CreateUserOutputDTO {
  token: string;
  userId: string;
}

export interface LoginUserInputDTO {
  email: string;
  password: string;
}

export interface LoginUserOutputDTO {
  token: string;
  userId: string;
}

export interface DeleteUserInputDTO {
  token: string;
  id: string;
}

export interface GetUserByIdInputDTO {
  id: string;
  token: string;
}

export interface EditUserInputDTO {
  token: string;
  id: string;
  username: string;
  email: string;
  roleId: USER_ROLES;
}

export interface EditUserOutputDTO {
  message: string;
}



export class UserDTO {
  getUserInput(token: unknown) {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetUserInputDTO = {
      token,
    };

    return result;
  }

  getUserOutput(user: User): GetUserOutputDTO {
    const result: GetUserOutputDTO = {
      id: user.getId(),
      username: user.getUsername(),
      role_id: user.getRoleId(),
      email: user.getEmail(),
      created_at: user.getCreatedAt(),
    };

    return result;
  }

  createUserInput(
    username: unknown,
    email: unknown,
    password: unknown,
    roleId: USER_ROLES
  ): CreateUserInputDTO {
    if (typeof username !== "string") {
      throw new BadRequestError("'username' precisa ser uma string");
    }

    if (username.length < 2) {
      throw new BadRequestError(
        "'username' precisa ter no mínimo 2 caracteres"
      );
    }

    if (typeof email !== "string") {
      throw new BadRequestError("'email' precisa ser uma string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("'password' precisa ser uma string");
    }

    const result: CreateUserInputDTO = {
      username,
      email,
      password,
      roleId,
    };

    return result;
  }

  createUserOutput(token: string, userId: string): CreateUserOutputDTO {
    const result: CreateUserOutputDTO = {
      token,
      userId,
    };

    return result;
  }

  loginUserInput(email: unknown, password: unknown): LoginUserInputDTO {
    if (typeof email !== "string") {
      throw new BadRequestError("'email' deve ser string");
    }

    if (typeof password !== "string") {
      throw new BadRequestError("'password' deve ser string");
    }

    const result: LoginUserInputDTO = {
      email,
      password,
    };

    return result;
  }

  deleteUserInput(token: unknown, id: string): DeleteUserInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: DeleteUserInputDTO = {
      token,
      id,
    };

    return result;
  }

  getUserInputById(token: unknown, id: string): GetUserByIdInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    const result: GetUserByIdInputDTO = {
      id,
      token,
    };

    return result;
  }

  editUserInput(
    token: unknown,
    id: string,
    username: unknown,
    email: unknown,
    roleId: USER_ROLES
  ): EditUserInputDTO {
    if (typeof token !== "string") {
      throw new BadRequestError("Token inválido");
    }

    if (typeof username !== "string") {
      throw new BadRequestError("'username' precisa ser uma string");
    }

    if (typeof email !== "string") {
      throw new BadRequestError("'email' precisa ser uma string");
    }

    const result: EditUserInputDTO = {
      token,
      id,
      username,
      email,
      roleId,
    };

    return result;
  }

  public editUserOutput(message: string): EditUserOutputDTO {
    return { message };
  }
}
