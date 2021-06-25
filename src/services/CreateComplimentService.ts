import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest{
  tagId: string;
  userSender: string;
  userReceiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({ tagId, userSender, userReceiver, message}: IComplimentRequest){
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if(userSender === userReceiver) {
      throw new Error("Incorrect User Receiver");
    }

    const userReceiverExists = await usersRepositories.findOne(userReceiver);

    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!");
      
    }

    const compliment = complimentsRepositories.create({
      tagId,
      userSender,
      userReceiver,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment;

  }
}

export { CreateComplimentService }