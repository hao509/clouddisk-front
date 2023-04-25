<template>
  <div class="login">
      <div class="login_box">
      <el-form ref="loginForm" :model="loginForm" class="elform">
        <h3>你的云盘</h3>
        
        <el-form-item class="elform1">
          <el-input v-model="loginForm.id"
                    id="id"
                    type="text"
                    placeholder="用户名"
                    auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item  class="elform2">
          <el-input v-model="loginForm.password"
                    id="password"
                    type="password"
                    placeholder="密码"
                    auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="margin-left:100px;margin-top: 50px;" class="btn-all" size="medium" type="primary" @click="accountLogin">登录</el-button>
          <el-button class="btn-all" size="medium" type="primary" @click="toaccountregister">注册</el-button>
          <router-link to="forget" :underline="false">忘记密码</router-link>
        </el-form-item>
      </el-form>
      </div>
      <vue-particles
                color="#409EFF"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#409EFF"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >   </vue-particles>

 

  </div>
</template>

<script>
import {isDataValid} from "../../util/validate.js"
import {apiService} from "../../util/api.js"
import { CanceledError } from "axios"
import router from '@/router/index.js'

export default {
    name: "login",
    data() {
        return {
            loginForm: {
                id: "",
                password: ""
            },
            test: {
                username: "admin",
                password: "123456"
            }
        };
    },
    mounted() {
    },
    methods: {
        //消息提示方法
        msg(type, msg) {
            console.log(type, msg);
            //type:success,warning,error
            this.$message({
                showClose: true,
                message: msg,
                type: type
            });
        },
        //登录函数
        accountLogin() {
            if (!isDataValid(this.loginForm.id)) {
                this.msg("warning", "账户不能为空");
                return false;
            }
            if (!isDataValid(this.loginForm.password)) {
                this.msg("warning", "密码不能为空");
                return false;
            }
            console.log(this.loginForm);
            apiService.login(this.loginForm).then((res) => {
                console.log(res.data);
                let data = res.data;
                if (data.code == '200') {
                    //存储信息到本地
                    //token
                    console.log("1");
                    localStorage.setItem("logintoken", JSON.stringify(data));
                    this.$router.push('/home');
                }
                else {
                    this.msg("error", data.message);
                }
            }, (error) => {
                this.msg("error", "系统异常，请联系管理员");
            });
        },
        toaccountregister(){
          this.$router.push('/register');
          

        }
    },
    components: { CanceledError }
}
</script>

<style scoped>
.login{
  width: 100%;
  height: 100%;
  min-width: 992px;
  background-color: rgba(30, 141, 245, 0.1);
  overflow: hidden;
  display:flex;
}
.elform{
  border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        height: 100%;
        padding: 15px 35px 15px 35px;
        background: rgb(240, 252, 255);
        
        /* box-Shadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.5)", */


}
.elform1{
  padding-top: 60px;
}
.login_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
h3{
  text-align: center;
  padding-bottom: 10px;
  margin-top:30px ;
}
a{
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}


</style>
