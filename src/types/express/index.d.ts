declare namespace Express {
  interface Request {
    transform: (arg1: T) => T
  }
}
