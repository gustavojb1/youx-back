import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO } from "../dtos/UserDTO";
import { BaseError } from "../errors/BaseError";

export class UserController {
  constructor(private userBusiness: UserBusiness, private userDTO: UserDTO) {}

  
  public getUsers = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.userDTO.getUserInput(token);
      const output = await this.userBusiness.getUsers(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public getPatients = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.userDTO.getUserInput(token);
      const output = await this.userBusiness.getPatients(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public getNurses = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const input = this.userDTO.getUserInput(token);
      const output = await this.userBusiness.getNurses(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public createUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password, roleId } = req.body;

      const input = this.userDTO.createUserInput(
        username,
        email,
        password,
        roleId
      );
      const output = await this.userBusiness.createUser(input);

      res.status(201).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public deleteUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;

      const input = this.userDTO.deleteUserInput(token, id);
      await this.userBusiness.deleteUser(input);

      res.status(200).send({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const input = this.userDTO.loginUserInput(email, password);
      const output = await this.userBusiness.loginUser(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  
  public editUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      const { id } = req.params;
      const { username, email, roleId } = req.body;

      const input = this.userDTO.editUserInput(
        token,
        id,
        username,
        email,
        roleId
      );
      const output = await this.userBusiness.editUser(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
