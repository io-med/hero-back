import 'dotenv/config';

export function delayMiddleWare(req, res, next) {
  setTimeout( next, process.env.DELAY);
}
