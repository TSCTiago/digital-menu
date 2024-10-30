import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../../repositories/users';
import { generateTokens } from '../../../utils/jwt';
import { AuthRepository } from '../../../repositories/auth';
import { hashToken } from '../../../utils/hashToken';
import { loginSchema, registerSchema } from '../../../schemas/auth';
import { validateSchema } from '../../../middlewares/validateSchema';

interface IPayload {
  jti: string;
  userId: string;
}

const route = Router();

route.post(
  '/register',
  validateSchema(registerSchema),
  async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const existingEmail = await UserRepository.findByEmail(email);

      if (existingEmail) {
        res.status(403).json({
          message: 'Email already in use.',
        });

        return;
      }

      const user = await UserRepository.create({
        id: uuidv4(),
        name,
        email,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

route.post(
  '/login',
  validateSchema(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const existingUser = await UserRepository.findByEmail(email);

      if (!existingUser) {
        res.status(403).json({
          message: 'Invalid login credentials.',
        });

        return;
      }

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!validPassword) {
        res.status(403).json({
          message: 'Invalid login credentials.',
        });

        return;
      }

      const jti = uuidv4();
      const { accessToken, refreshToken } = generateTokens(existingUser, jti);
      await AuthRepository.addRefreshTokenToWhitelist({
        jti,
        refreshToken,
        userId: existingUser.id,
      });

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (err) {
      res.json({
        err: err,
      });
      next(err);
    }
  }
);

route.post('/refresh_token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({
        message: 'Missing refresh token.',
      });

      return;
    }

    const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as IPayload;
    const savedRefreshToken = await AuthRepository.findRefreshTokenById(
      payload.jti
    );

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401).json({
        message: 'Unauthorized',
      });

      return;
    }

    const hashedToken = hashToken(refreshToken);

    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401).json({
        message: 'Unauthorized',
      });

      return;
    }

    const user = await UserRepository.findById(payload.userId);

    if (!user) {
      res.status(401).json({
        message: 'Unauthorized',
      });

      return;
    }

    await AuthRepository.deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await AuthRepository.addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
});

route.post('/revoke-tokens', async (req, res, next) => {
  try {
    const { userId } = req.body;
    await AuthRepository.revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
});

export default route;
