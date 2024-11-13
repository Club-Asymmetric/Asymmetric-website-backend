class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class ClientError extends ApiError {
  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static methodNotAllowed(message = "Method Not Allowed") {
    return new ApiError(405, message);
  }

  static notAcceptable(message = "Not Acceptable") {
    return new ApiError(406, message);
  }

  static requestTimeout(message = "Request Timeout") {
    return new ApiError(408, message);
  }

  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }

  static gone(message = "Gone") {
    return new ApiError(410, message);
  }

  static payloadTooLarge(message = "Payload Too Large") {
    return new ApiError(413, message);
  }

  static uriTooLong(message = "URI Too Long") {
    return new ApiError(414, message);
  }

  static unsupportedMediaType(message = "Unsupported Media Type") {
    return new ApiError(415, message);
  }

  static imATeapot(message = "I'm a Teapot") {
    return new ApiError(418, message);
  }

  static tooManyRequests(message = "Too Many Requests") {
    return new ApiError(429, message);
  }
}

class ServerError extends ApiError {
  static notImplemented(message = "Not Implemented") {
    return new ServerError(501, message);
  }

  static badGateway(message = "Bad Gateway") {
    return new ServerError(502, message);
  }

  static httpVersionNotSupported(message = "HTTP Version Not Supported") {
    return new ServerError(505, message);
  }

  static insufficientStorage(message = "Insufficient Storage") {
    return new ServerError(507, message);
  }

  static loopDetected(message = "Loop Detected") {
    return new ServerError(508, message);
  }

  constructor(status, message) {
    super(status, message);
  }
}

export { ApiError, ClientError, ServerError };
