export default {
  server: {
    port: +process.env.PORT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
    maxAge: +process.env.SESSION_MAX_AGE,
  },
  pages: {
    signIn: '/auth/sign-in',
  },
};
