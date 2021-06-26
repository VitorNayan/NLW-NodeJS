import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  
  const authToken = request.headers.authorization
 
  if(!authToken){
    return response.status(401).end();
  }

  const [,token] = authToken.split(" ")

  try {
    const { sub } = verify(token ,"a8e3262fe47214fad706dc0b3e24b1db") as IPayload;

    request.user_id = sub;
      
    return next(); 
  } catch(err){
    return response.status(401).end();
  }

  
  
}