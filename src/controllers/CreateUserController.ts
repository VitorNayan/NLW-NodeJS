import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"

class CreateUserController {

  async handle(request: Request, response: Response){
    try {
      const { name, email, admin} = request.body;

      const createUserService = new CreateUserService();
  
      const user = await createUserService.execute({name, email, admin});
  
      return response.json(user);
    } catch (err) {
      return response.status(400).json({error: err.message})
    }


  }
}

export { CreateUserController };