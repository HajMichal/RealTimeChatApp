class FriendExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FriendExistsError";
  }
}

class TryingToAddYouselfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TryingToAddYouselfError";
  }
}

class NotExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotExistsError";
  }
}

export { FriendExistsError, TryingToAddYouselfError, NotExistsError };
