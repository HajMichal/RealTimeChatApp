interface userInterface {
    name: string,
    email: string,
    password: string
}

declare global {
    namespace Express {
      interface Request {
        user: userInterface;
      }
    }
  }

export {
    userInterface
 }