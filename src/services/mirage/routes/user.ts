import { Request, Response } from "miragejs";
import { handleError } from "./../server";
import { User } from "./../../../interfaces/interfaces";
import { randomBytes } from "crypto";

const generateToken = () => randomBytes(8).toString("hex");

export interface AuthResponse {
  token: string;
  user: User;
};

const signin = (schema : any , req : Request)  : AuthResponse | Response => {

  const {username , password} = JSON.parse( req.requestBody);
  const user = schema.users.findBy({username});
  const token = generateToken();

  if (!user){
    return handleError( null , 'No user with that username exists')
  }

  if (password !== user.password){
    return handleError (null, 'Password is incorrect');
  }

  return {
    user,
    token 
  }
  

};

const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const user = schema.users.create(data);

  const token = generateToken();

  return {
    user,
    token,
  };
};

export default { signup, signin };
