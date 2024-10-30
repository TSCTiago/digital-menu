import bcrypt from 'bcrypt';
import { db } from '../services/database';
import { User } from '@prisma/client';

function findByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

function findById(userId: string) {
  return db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

function create(user: User) {
  user.password = bcrypt.hashSync(user.password, 12);

  return db.user.create({
    data: user,
  });
}

function update(user: User) {
  return db.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

function remove(userId: string) {
  return db.user.delete({
    where: {
      id: userId,
    },
  });
}

export const UserRepository = {
  findByEmail,
  findById,
  create,
  update,
  remove,
};
