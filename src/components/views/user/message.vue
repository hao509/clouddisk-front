<template>
    <div> <el-upload action="/api/updata/userupdata" :on-success="uploadSuccess" :headers="headers">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload> </div>
</template>
<script>
export default {
    computed:{
        headers(){
            var token = localStorage.getItem("logintoken");
            console.log(token);
            var userObj = JSON.parse(token);
            token = userObj.data.id
            console.log(token);
            
            return {
                token: token
            };

    }
    },
    // getToken() {
    //     var user = localStorage.getItem("logintoken");
    //     var userObj = JSON.parse(user);
    //     var token = userObj.data.id;
        
    //     console.log("44", token);
    //     return token;

    // },
  

    
    methods:
        { uploadSuccess(res) { 
            console.log("接口请求成功成功"); 
            console.log(res);
            if(res.code==500){
                console.log("用户空间不足");
                    this.$message({
                        type: 'error',
                        message: '上传失败，用户空间不足'
                    });
            }
        } }
};
</script>