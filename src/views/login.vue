<template>
  <div class="login">
    <div class="container">
      <!-- 图片 -->
      <img src="@/assets/avatar.jpg" alt="" class="avatar" />

      <!-- :model 绑定的数据对象 -->
      <!-- :rules 是验证规则 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <!-- prop：绑定的验证规则的名称 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入手机号码"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-button type="primary" class="login-btn">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      loginForm: {
        username: "",
        password: "",
      },
      // 验证规则
      rules: {
        username: [
          // required: 是必填项 message：不符合的提示信息 trigger：触发时机
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[35678]\d{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^.{3,16}$/,
            message: "请输入3~16位的密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>