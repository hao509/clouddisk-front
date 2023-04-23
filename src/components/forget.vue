<template>
    <div class="forget">
        <div class="forget_box">
            <el-form ref="forget" :model="forgetForm" class="elform">
                <h3>你的云盘</h3>

                <el-form-item class="elform1">
                    <el-input v-model="forgetForm.id" id="id" type="text" placeholder="id" auto-complete="off"></el-input>
                </el-form-item>
             
                <el-form-item class="elform2">
                    <el-input v-model="forgetForm.newpassword" id="password" type="password" placeholder="新密码"
                        auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="elform3">
                    <el-input v-model="forgetForm.realName" id="realname" type="text" placeholder="真实姓名"
                        auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="elform4">
                    <el-input v-model="forgetForm.phoneNum" id="phoneNum" type="text" placeholder="电话号码"
                        auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:100px;margin-top: 50px;" class="btn-all" size="medium" type="primary"
                        @click="toaccountLogin">去登录</el-button>
                    <el-button class="btn-all" size="medium" type="primary" @click="accountforget">修改</el-button>
                </el-form-item>
            </el-form>
        </div>
        <vue-particles color="#409EFF" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4"
            linesColor="#409EFF" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3"
            :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push"> </vue-particles>



    </div>
</template>
<script>
import { isDataValid } from "../../util/validate.js"
import { apiService } from "../../util/api.js"
import { CanceledError } from "axios"

export default {
    name: "forget",
    data() {
        return {
            forgetForm: {
                id: "",
                realName: "",
                phoneNum: "",
                newpassword: ""
            },

        };
    },
    mounted() {
    },
    methods:{
        msg(type, msg) {
            console.log(type, msg);
            //type:success,warning,error
            this.$message({
                showClose: true,
                message: msg,
                type: type
            });
        },
        toaccountLogin() {
            this.$router.push('/');


        },
      
        accountforget(){
            if (!isDataValid(this.forgetForm.id)) {
                this.msg("warning", "id不能为空");
                return false;
            }
            if (!isDataValid(this.forgetForm.newpassword)) {
                this.msg("warning", "密码不能为空");
                return false
            }
          
             if (!isDataValid(this.forgetForm.realName)) {
                this.msg("warning", "真实姓名不能为空");
                return false;
            }
             if (!isDataValid(this.forgetForm.phoneNum)) {
                this.msg("warning", "电话号码不能为空");
                return false;
            }
            console.log(this.forgetForm);
            apiService.forgetpassword(this.forgetForm).then((res)=>{
                console.log(res.data);
                let data = res.data;
                if (data.code == '200') {
                    
                    console.log("1");
                    this.$message({
                        type: 'success',
                        message: '修改成功，请登录'
                    });
                   
                }
                else {
                    this.msg("error", data.msg);
                    this.$message({
                        type: 'error',
                        message: '修改失败，用户信息错误'
                    });
                }
            }, (error) => {
                this.msg("error", "系统异常，请联系管理员");


            })
        }

    },
}
</script>
<style scoped>
.forget{
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
.forget_box {
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

</style>
