import { Request, Response } from 'express';
import { addUser } from '../../controllers/userController';
import { createUserService } from '../../services/userservice';
import HTTP_STATUS from '../../constants/httpStatus';

// Mock the service function
jest.mock('../../services/userservice', () => ({
  createUserService: jest.fn(),
}));

describe('addUser Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn(() => res as Response);

    req = {
      body: {},
    };

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if required fields are missing', async () => {
    req.body = {}; // Missing fields

    await addUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'All fields are required' });
  });

  test('should return 400 if service returns an error', async () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    // Mock service to return an error
    (createUserService as jest.Mock).mockResolvedValueOnce({ error: 'Email already exists' });

    await addUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Email already exists' });
  });

  test('should return 201 if user is created successfully', async () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    // Mock service to return success
    (createUserService as jest.Mock).mockResolvedValueOnce({ success: 'User created successfully' });

    await addUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User created successfully' });
  });

  test('should handle unexpected errors and return 500', async () => {
    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };

    // Mock service to throw an error
    (createUserService as jest.Mock).mockRejectedValueOnce(new Error('Unexpected error'));

    await addUser(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });
});
