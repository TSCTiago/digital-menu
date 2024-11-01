import { db } from '../services/database';
import { hashToken } from '../utils/hashToken';

function addRefreshTokenToWhitelist({
  jti,
  refreshToken,
  userId,
}: {
  jti: string;
  refreshToken: string;
  userId: string;
}) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

function findRefreshTokenById(id: string) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

function deleteRefreshToken(id: string) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

function revokeTokens(userId: string) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export const AuthRepository = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
