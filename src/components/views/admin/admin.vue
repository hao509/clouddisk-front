<template>
    <div>
        <div class="register">
            <div class="register_box">
                <el-form ref="register" :model="registerForm" class="elform">
                    <h3>管理员注册</h3>

                    <el-form-item class="elform1">
                        <el-input v-model="registerForm.id" id="id" type="text" placeholder="id"
                            auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="elform2">
                        <el-input v-model="registerForm.username" id="username" type="text" placeholder="用户名"
                            auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="elform3">
                        <el-input v-model="registerForm.password" id="password" type="password" placeholder="密码"
                            auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="elform4">
                        <el-input v-model="registerForm.realname" id="realname" type="text" placeholder="真实姓名"
                            auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class="elform3">
                        <el-input v-model="registerForm.phonenum" id="phonenum" type="text" placeholder="电话号码"
                            auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>

                        <el-button class="btn-all" type="primary" @click="accountregister" style="text-align: center; width: 350px;;" >注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { isDataValid } from "../../../../util/validate.js"
import { apiService } from "../../../../util/api.js"
import { CanceledError } from "axios"
export default {
    name: "register",
    data() {
        return {
            registerForm: {
                id: "",
                username: "",
                password: "",
                realname: "",
                phonenum: ""
            },
            test: {
                id: "zzh1",
                username: "admin",
                password: "123456",
                realname: "zzh",
                phonenum: "19822971881"
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
        accountregister() {
            if (!isDataValid(this.registerForm.username)) {
                this.msg("warning", "账户不能为空");
                return false;
            }
            if (!isDataValid(this.registerForm.password)) {
                this.msg("warning", "密码不能为空");
                return false
            }
            if (!isDataValid(this.registerForm.id)) {
                this.msg("warning", "id不能为空");
                return false;
            }
            if (!isDataValid(this.registerForm.realname)) {
                this.msg("warning", "真实姓名不能为空");
                return false;
            }
            if (!isDataValid(this.registerForm.phonenum)) {
                this.msg("warning", "电话号码不能为空");
                return false;
            }
            console.log(this.registerForm);
            apiService.register_admin(this.registerForm).then((res) => {
                console.log(res.data);
                let data = res.data;
                if (data.code == '200') {
                    //存储信息到本地
                    //token
                    console.log("1");
                    this.$message({
                        type: 'success',
                        message: '注册成功，请登录'
                    });
                    //localStorage.setItem("logintoken", JSON.stringify(data));
                    //this.$router.push('/');
                     this.$refs.form.resetFields();  
                }
                else {
                    this.msg("error", data.msg);
                    this.$message({
                        type: 'error',
                        message: '注册失败，已有该用户'
                    });
                     this.$refs.form.resetFields();  
                }
            }, (error) => {
                this.msg("error", "系统异常，请联系管理员");
            });
        },
        toaccountLogin() {
            this.$router.push('/');


        }
    },
    components: { CanceledError }




}
</script>


<style>
.register {
    width: 100%;
    height: 100%;
    min-width: 992px;
    background-color: rgba(30, 141, 245, 0.1);
    overflow: hidden;
    display: flex;
}

.elform {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    height: 100%;
    padding: 15px 35px 15px 35px;
    background: rgb(240, 252, 255);

    /* box-Shadow: "0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.5)", */


}

.elform1 {
    padding-top: 60px;
}

.register_box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

h3 {
    text-align: center;
    padding-bottom: 10px;
    margin-top: 30px;
}


</style>