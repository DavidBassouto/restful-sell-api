import { Request, Response } from 'express';
import { CreateUsersService } from '../services/createUser.service';
import { ListUsersService } from '../services/listUsers.service';

export class UsersController {
  public async index(req: Request, res: Response) {
    const listUser = new ListUsersService();

    const users = await listUser.execute();

    return res.json({
      message: 'Users listed with success',
      users: users,
    });
  }

  public async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUser = new CreateUsersService();
    const user = await createUser.execute({ name, email, password });

    return res.status(201).json({
      message: 'User created with success',
      user: user,
    });
  }
}
