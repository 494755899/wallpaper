<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a
          href="/"
          class="site-logo" />
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button
              type="primary"
              size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item
          label="昵称"
          prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email">
          <el-input v-model="ruleForm.email" />
          <el-button
            :disabled="disabled"
            size="mini"
            round
            @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item
          label="验证码"
          prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password" />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="http://www.meituan.com/about/terms"
            target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      disabled: false,
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  layout: 'blank',
  methods: {
    sendMsg() {
      let namePass
      let emailPass
      // 对昵称进行检查
      this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })
      // 如果没有昵称则退出
      if (namePass) {
        return false
      }
      // 对Email进行检查
      this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })
      // 如果有昵称或者Email进行发送请求
      if (!namePass && !emailPass) {
        this.disabled = true
        this.$axios
          .post('/users/verify', {
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              this.statusMsg = `验证码已发送,剩余${count--}秒`
              this.timerid = setInterval(() => {
                this.statusMsg = `验证码已发送,剩余${count--}秒`
                if (count === 0) {
                  clearInterval(this.timerid)
                  // 计数为0的时候把提示清空，同时解锁按纽
                  this.statusMsg = ''
                  this.disabled = false
                }
              }, 1000)
            } else {
              // 如果请求错误把请求结果返回给页提示,同时解销按纽
              this.disabled = false
              this.statusMsg = data.msg
            }
          })
      }
    },
    register: function() {
      let self = this
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          self.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  self.error = data.msg
                }
              } else {
                self.error = `服务器出错，错误码:${status}`
              }
              setTimeout(function() {
                self.error = ''
              }, 1500)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
