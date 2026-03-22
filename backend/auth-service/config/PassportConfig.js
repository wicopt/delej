const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('../models/UserModel'); // Ваша функция для поиска в БД

const options = {
  // 1. Говорим, где искать токен (в заголовке Authorization)
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // 2. Секретный ключ
  secretOrKey: 123,
};

// Стратегия вызывается каждый раз, когда приходит запрос с токеном
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      // payload — это то, что мы положили в токен (например, { id: 1, email: ... })
      const user = await UserModel.findUserById(payload.id);
      
      if (user) {
        // Если пользователь найден, пропускаем его
        return done(null, user); 
      } else {
        // Если пользователь не найден, но токен был валидным (ошибка)
        return done(null, false); 
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;