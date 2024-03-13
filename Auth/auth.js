/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { UserFromAuth, userFromToken } from '../utils/auth';

/**
 * Basic auth
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise} next
 */
const basicAuth = async (req, res, next) => {
  const user = await UserFromAuth(req);

  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};

/**
 * Token auth
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise} next
 */
const tokenAuth = async (req, res, next) => {
  const user = await userFromToken(req);

  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  req.user = user;
  next();
};
export { basicAuth, tokenAuth };
