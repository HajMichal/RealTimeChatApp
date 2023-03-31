class FriendExistsError extends Error {
    constructor(message: string) {
      super(message)
      this.name = "FriendExistsError"
    }
  }

class TryingToAddYouselfError extends Error {
    constructor(message: string) {
      super(message)
      this.name = "TryingToAddYouselfError"
    }
  }

export {
  FriendExistsError, 
  TryingToAddYouselfError
}