const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
module.exports = (passport) => {

    passport.use(
        'jwt',
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
                secretOrKey: "abcd1234", /*Change Secret Key*/
            },
            async (jwtPayload, done) => {
                console.log(jwtPayload);
                try {
                    // Extract user
                    const user = jwtPayload.user;
                    done(null, user);
                } catch (error) {
                    done(error, false);
                }
            }
        )
    );
};