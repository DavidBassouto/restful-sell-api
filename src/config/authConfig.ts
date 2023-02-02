import 'dotenv/config';

export default {
  jwt: {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
};
