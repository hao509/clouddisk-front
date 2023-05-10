<template>
<div>
    <el-table :data="userData" stripe class="userBox" >

<el-table-column prop="id" label="用户id"></el-table-column>
<el-table-column prop="username" label="用户名"></el-table-column>
<el-table-column prop="realname" label="用户姓名"></el-table-column>
<el-table-column prop="phonenum" label="电话号码"></el-table-column>
<el-table-column prop="idstatus" label="用户状态">
   <template slot-scope="scope">
              {{ String(scope.row.idstatus) === '0' ? '已禁用' : '正常' }}
            </template>
</el-table-column>



   

<el-table-column label="操作" width="160" align="center">
  <template slot-scope="scope">

    <el-button type="text" size="small" class="delBut non" @click="deleteuser(scope.row.id)">
      删除
    </el-button>
    <el-button type="text" size="small" class="delBut non" @click="statusHandle(scope.row.id)">
      {{ scope.row.idstatus == '1' ? '禁用' : '启用' }}
      
    </el-button>

  
  </template>
</el-table-column>
</el-table>
</div>
</template>

<script>
import { apiService } from '../../../../util/api'
export default {
name: 'userList',
data(){
  return {
      page: 1,
      pageSize: 5,
      id: '',
      username:'',
      userData: [],
      realname: '',
      phonenum:'',
      idstatus:'',
      userspace:'',
      password:''
    }
},
 created() {
    this.init()
  },
  methods: {
    async init() {
      apiService.getuserlist().then(res => {
       // console.log(params)
        if (String(res.data.code) === '200') {
          this.userData = res.data.data|| []
          this.counts = res.data.data.total
          //console.log(res.data.records);        
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    deleteuser(id){
      apiService.deleteuser(id).then(res=>{
        if(String(res.data.code) === '200'){
          this.$message.success('删除成功！')
          this.init()

        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })

    },
    statusHandle(id){
      apiService.statusHandle(id).then(res=>{
        if(res.data.code === '200'){
          this.$message.success('修改成功');
          this.init()
          this.$set(data, index, row) 
          
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    }
  }
}
</script>

<style>

</style>