// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from "express";

/**
 * for error handling
 */
class MyError extends Error {
  constructor(message, code) {
    super();
    this.code = code;
    this.message = message;
  }
}

/**
 * Error response
 * @param {Error} err
 * @param {Response} res
 * @param {Request} req
 * @param {NextFunction} next
 * @returns {Response} res
 */
// eslint-disable-next-line no-unused-vars
const errResponse = (err, res, req, next) => {
  const defaultErr = `Failed to process ${req.url}`;
  if (err instanceof MyError) {
    res.status(err.code).send({ error: err.message || defaultErr });
    return;
  }
  res
    .status(500)
    .send({ error: err ? err.message || err.toString() : defaultErr });
};
export { MyError, errResponse };
