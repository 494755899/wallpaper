import Router from 'koa-router'
import axios from './utils/axios'
import MeunModel from '../dbs/models/meuns'
let router = new Router({
  prefix: '/geos'
})

const sign = 2492808

router.get('/getPosition', async ctx => {
  let {
    status,
    data: { province, city }
  } = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  console.log(status, province, city)
  if (status === 200) {
    ctx.body = {
      province: '上海',
      city: '上海'
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/menu', async ctx => {
  let result = ''
  try {
    result = await MeunModel.find({})
    ctx.body = {
      code: 0,
      result
    }
  } catch (error) {
    ctx.body = {
      code: -1,
      msg: '获取数据失败'
    }
    console.log(error)
  }
})
export default router
