import newJwt from 'passport-jwt';
import Extract from "passport-jwt";
import passport from 'passport';
import User from '../models/user';
import dotenv from 'dotenv'

dotenv.config()

const JwtStrategy= newJwt.Strategy;

const extractJwt= Extract.ExtractJwt;

async function testpassport(){
    passport.use(
        new JwtStrategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
            },
            (jwtPayload, done) => {
                return User.findOne({ _id: jwtPayload })
                  .then((user) => {
                    return done(null, user);
                  })
                  .catch((err) => done(err));
              }
        )
    )
}

export default testpassport