import { Session } from "express-session";

declare module "express-session" {
  interface Session {
    user: {
      id: string; // Adjust the type based on your user ID type
      // Add other user properties here
    };
  }
}
