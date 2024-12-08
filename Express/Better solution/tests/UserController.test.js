const userController = require('../controllers/userController');
const userService = require('../services/userService');
const httpMocks = require('node-mocks-http');

jest.mock('../services/userService');
jest.mock('../models/userModel', () => ({
    findById: jest.fn(),
}));
describe('UserController.getUser', () => {
    it('should return user data if user exists', async () => {
        const mockUser = { id: 1, name: 'John Doe' };
        userService.getUserById.mockResolvedValue(mockUser);

        const req = httpMocks.createRequest({ params: { id: 1 } });
        const res = httpMocks.createResponse();

        await userController.getUser(req, res);

        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res._getData())).toEqual(mockUser);
    });

    it('should return 404 if user does not exist', async () => {
        userService.getUserById.mockResolvedValue(null);

        const req = httpMocks.createRequest({ params: { id: 1 } });
        const res = httpMocks.createResponse();

        await userController.getUser(req, res);

        expect(res.statusCode).toBe(404);
        expect(JSON.parse(res._getData())).toEqual({ message: 'User not found' });
    });

    it('should return 500 if there is a server error', async () => {
        userService.getUserById.mockRejectedValue(new Error('Server error'));

        const req = httpMocks.createRequest({ params: { id: 1 } });
        const res = httpMocks.createResponse();

        await userController.getUser(req, res);

        expect(res.statusCode).toBe(500);
        expect(JSON.parse(res._getData())).toEqual({ message: 'Server error' });
    });
});
