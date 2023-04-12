<template>
  <div>
    <div> <el-upload action="/api/updata/userupdata" :on-success="uploadSuccess" :headers="headers"
      :auto-upload="true" 
      :on-preview="handlePreview">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      
    </div>

    <el-table :data="tableData" stripe class="tableBox" @selection-change="handleSelectionChange">
      
      <el-table-column prop="docfakename" label="文件名"></el-table-column>
      <el-table-column prop="docsize" label="文件大小"></el-table-column>
      <el-table-column prop="docowner" label="文件拥有者"></el-table-column>
      <el-table-column prop="docid" label="文件id"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
         
          <el-button type="text" size="small" class="delBut non" @click="deleteHandle(scope.row.docid)">
            删除
          </el-button>
          <el-button type="text" size="small" class="delBut non" @click="download(scope.row.docfakename)">
            下载
          </el-button>
          <el-button type="text" size="small" class="delBut non" @click="fileshare(scope.row.docid)">
            分享
          </el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script>
import { apiService } from '../../../../util/api'
//D:\zpfront\my-plan\util
//D:\zpfront\my-plan\src\components\views\user\first.vue
//my-plan\util\api.js
export default {
  name:'fileList',
  data() {
    return {
      page: 1,
      pageSize: 5,
      name: '',
      
      tableData: [],
      docid:''
    }
  },
  created() {
    this.init()
  },
  computed: {
    headers() {
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
  {
    uploadSuccess(res) {
      console.log("接口请求成功成功");
      console.log(res);
      this.init();
      if(res.code==200) {
        this.$message({
          type: 'success',
          message: '上传成功'
        });
      }
      if (res.code == 500) {
        console.log("用户空间不足");
        this.$message({
          type: 'error',
          message: '上传失败，用户空间不足'
        });
      }
    },
    async init() {
      var token = localStorage.getItem("logintoken");
      console.log(token);
      var userObj = JSON.parse(token);
      token = userObj.data.id

      const params = {
        page: 2,
        pagesize: 5,
        name: token
      }
      apiService.getFilePage(params).then(res => {
        console.log(params)
        if (String(res.data.code) === '200') {
          this.tableData = res.data.data.records || []
          this.counts = res.data.data.total
        }
      }).catch(err => {
        this.$message.error('请求出错了：' + err)
      })
    },
    
    deleteHandle(docid) {
     
      this.$confirm('确认删除该文件, 是否继续?', '确定删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        apiService.deleteFile(docid).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功！');
            this.init();
          } else {
            this.$message.error(res.msg || '操作失败');
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })
      })
    },
    download(docfakename){
      var token = localStorage.getItem("logintoken");
      console.log(token);
      var userObj = JSON.parse(token);
      token = userObj.data.id
      apiService.download(docfakename,token).then(response => {
       const  blob  = new Blob([response.data]);
       const fileName = '导出数据.xlsx'; // 指定导出文件名
        const a = document.createElement('a'); // 创建一个a标签
        const href = window.URL.createObjectURL(blob); // 通过URL.createObjectURL()方法创建一个下载链接
        a.href = href; // 设置a标签的href属性
        a.download = fileName; // 设置a标签的download属性
        a.click(); // 模拟a标签的点击事件，触发文件下载
        window.URL.revokeObjectURL(href); // 释放创建的URL对象


          if (res) {
            this.$message.success('下载成功！');
          
          } else {
            this.$message.error(res.msg || '操作失败');
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })   
        
      


      },
    fileshare(docid){

    },
    handlePreview(file){
      window.open(file.response.url);

    }

  }
};
</script>