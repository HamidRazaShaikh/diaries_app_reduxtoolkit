import {
  Server,
  Model,
  Factory,
  belongsTo,
  hasMany,
  Response,
  Request,
} from "miragejs";
import user from "./routes/user";

export const handleError = (error: any , message = "an error message") => {  

  return new Response(400, undefined, {
    data: {
      message,
      isError: true,
    },
  });
};

export const setupServer = (env?: string): Server => {
  return new Server({
    environment: env ?? "development",

    models: {
      entry: Model.extend({
        diary: belongsTo(),
      }),
      diary: Model.extend({
        entry: hasMany(),
        user: belongsTo(),
      }),
      user: Model.extend({
        diary: hasMany(),
      }),
    },

    factories: {
      user: Factory.extend({
        username: "hamid",
        password: "123",
        email: "hamid@gmail.com",
      }),

     
    },

    seeds: (server): any => {
      server.create("user");
      
    },

    routes(): void {
      this.urlPrefix = "https://diaries.app";

      this.post("/auth/signup", user.signup);  
      this.post("/auth/signin", user.signin);          
      
    },
  });
};