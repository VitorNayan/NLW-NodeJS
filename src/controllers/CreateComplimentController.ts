import { Request, Response } from "express"
import { CreateComplimentService } from "../services/CreateComplimentService"

class CreateComplimentController {

  async handle(request: Request, response: Response){
    const { tagId, userReceiver, message } = request.body;
    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();
  
    const compliment = await createComplimentService.execute({ tagId, userSender: user_id, userReceiver, message });

    return response.json(compliment); 
  }
}

export { CreateComplimentController };