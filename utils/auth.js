/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import sha1 from 'sha1';
import { Request } from 'express';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';

/**
 * Get user from auth
 * @param {Request} req
 * @returns {Promise} user
 */
const UserFromAuth = async (req) => {
  const auth = req.headers.authorization || null;
  if (!auth) return null;

  const buff = Buffer.from(auth.split(' ')[1], 'base64') || null;
  if (!buff) return null;

  const credentials = buff.toString('utf-8').split(':') || null;
  const { email, password } = {
    email: credentials[0],
    password: credentials[1],
  };
  console.log(email);
  if (!password) return null;
  const user = await dbClient.userCollection().findOne({ email });
  if (!user || sha1(password) !== user.password) return null;
  return user;
};

/**
 * Get user from token
 * @param {Request} req
 * @returns {Promise} user
 */
const userFromToken = async (req) => {
  const token = req.headers['x-token'] || null;
  if (!token) return null;

  const userId = await redisClient.get(`auth_${token}`);
  if (!userId) return null;

  const user = await dbClient
    .userCollection()
    .findOne({ _id: mongoDBCore.ObjectId(userId) });
  if (!user) return null;
  return user;
};
export { UserFromAuth, userFromToken };
