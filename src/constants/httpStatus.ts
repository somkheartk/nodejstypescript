// HTTP status codes for API responses
const HTTP_STATUS = {
    OK: 200, // The request was successful, and the response contains the requested data
    CREATED: 201, // The request was successful, and a new resource was created
    BAD_REQUEST: 400, // The server cannot process the request due to client-side errors (e.g., invalid input)
    UNAUTHORIZED: 401, // The request lacks valid authentication credentials (e.g., missing or invalid token)
    FORBIDDEN: 403, // The server understands the request but refuses to authorize it
    NOT_FOUND: 404, // The requested resource could not be found
    INTERNAL_SERVER_ERROR: 500, // The server encountered an unexpected condition that prevented it from fulfilling the request
};

  
  export default HTTP_STATUS;
  