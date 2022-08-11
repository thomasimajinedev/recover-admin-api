import { errorResponse } from '../helpers';
import AuthService from '../services/auth';
const authMiddleware = async (req, res, next) => {
  if (!(req.headers && req.headers['jwt'])) {
    return errorResponse(req, res, new Error('Token is not provided'), 401);
  }
  const token = req.headers['jwt'];

  try {
    const user = await AuthService.verifyJWT(token);

    req.user = user;

    return next();
  } catch (error) {
    return errorResponse(req, res, new Error('Incorrect token is provided, try re-login'), 401);
  }
};

export default authMiddleware;
