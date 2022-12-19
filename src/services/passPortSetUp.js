import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20'
import objectKeys from './keys'

passport.use(new GoogleStrategy({
    callbackURL: '/api/user/google/redirect',
    clientID: objectKeys.google.clientID,
    clientSecret: objectKeys.google.clientSecret
}, (profile, done) => {

}));