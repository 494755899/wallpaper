import Passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

Passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if (result != null) {
    if(result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

Passport.serializeUser((user, done) => {
  done(null, user)
})

Passport.deserializeUser((user, done) => {
  return done(null, user)
})

export default Passport
