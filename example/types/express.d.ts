declare global {
  namespace Express {
    export interface Request {
      transform?: (arg: any) => any
    }
  }
}
