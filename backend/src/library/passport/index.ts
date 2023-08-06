import bcrypt from "bcryptjs";
const Models = require("../../db/models/index.js");
const localStrategy = require("passport-local").Strategy;

module.exports = async function (passport: any) {
  passport.use(
    new localStrategy(async (email: any, password: any, done: any) => {
      await Models.users
        .findOne({
          where: {
            email: email,
          },
        })
        .then(async (user: any, err: any) => {
          if (err) throw err;
          if (!user) {
            return done(null, false, {
              errors: { msg: `Email tidak terdaftar`, param: `username` },
            });
          } else {
            if (!user.status) {
              return done(null, false, {
                errors: {
                  msg: `Email tidak aktif, Silahkan hubungi admin`,
                  param: `username`,
                },
              });
            } else {
              await bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                  return done(null, {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    role: user.role,
                  });
                } else {
                  return done(null, false, {
                    errors: { msg: `Password salah`, param: `password` },
                  });
                }
              });
            }
          }
        });
    })
  );

  passport.serializeUser((user: any, cb: any) => {
    cb(null, user.id);
  });
  passport.deserializeUser(async (id: any, cb: any) => {
    await Models.users
      .findOne({
        where: {
          id: id,
        },
      })
      .then((user: any, err: any) => {
        if (user.status) {
          cb(err, {
            id: user.id,
            nama: user.nama,
            email: user.email,
            role: user.role,
          });
        } else {
          cb(err, {});
        }
      });
  });
};
