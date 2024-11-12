class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

class ValidationError extends ApiError {
  constructor(message = "Invalid input") {
    super(400, message);
  }
}

class AuthenticationError extends ApiError {
  constructor(message = "Authentication failed") {
    super(401, message);
  }
}

export { ApiError, NotFoundError, ValidationError, AuthenticationError };
