<template>
  <div>
    <div> <el-upload action="/api/updata/userupdata" :on-success="uploadSuccess" :headers="headers" :auto-upload="true"
        :on-preview="handlePreview">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

    </div>

    <div>
      <el-input
      placeholder="请输入搜索关键字"
      v-model="keyword"
      @input="search"
    ></el-input>
    </div>

    <el-table :data="tableData" stripe class="tableBox">

      <el-table-column prop="docfakename" label="文件名"></el-table-column>
      <el-table-column prop="docsize" label="文件大小"></el-table-column>
      <el-table-column prop="docowner" label="文件拥有者"></el-table-column>
      <el-table-column prop="docid" label="文件id"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">

          <el-button type="text" size="small" class="delBut non" @click="deleteHandle(scope.row.docid)">
            删除
          </el-button>
          <el-button type="text" size="small" class="delBut non" @click="handleDownloadClick(scope.row.docid)">
            下载
          </el-button>
          <el-button type="text" size="small" class="delBut non" @click="fileshare(scope.row.docid)">
            分享
          </el-button>
          <el-button type="text" size="small" class="delBut non" @click="filepreview(scope.row.docid)">
            预览
          </el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>
<script>
import { apiService } from '../../../../util/api'
import * as FileSaver from 'file-saver';
import { Blob } from 'blob-polyfill';
import axios from "axios";

//D:\zpfront\my-plan\util
//D:\zpfront\my-plan\src\components\views\user\first.vue
//my-plan\util\api.js
export default {
  name: 'fileList',
  data() {
    return {
      page: 1,
      pageSize: 5,
      name: '',
      keyword:'',
      tableData: [],
      docid: '',
      token:''
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
      if (res.code == 200) {
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

    handleDownloadClick(docid) {
      var token = localStorage.getItem("logintoken");
      console.log(token);
      var userObj = JSON.parse(token);
      token = userObj.data.id



      apiService.download(docid, token).then(res => {

        const contentDisposition = res.headers['content-disposition'];
        const filename = contentDisposition.split('filename=')[1];
        const contentType = res.headers['content-type'];
        const blob = new Blob([res.data], { type: contentType });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = decodeURIComponent(filename);
        document.body.appendChild(link);
        link.click();

        // 延迟移除link元素，确保下载完成
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
      } ).catch (error=>{
        console.error('下载文件失败:', error);
      })
    },


    
  fileshare(docid) {
    var token = localStorage.getItem("logintoken");
    console.log(token);
    var userObj = JSON.parse(token);
    token = userObj.data.id
    apiService.fileshare(docid, token).then(res => {
      if (res.data.code == 200) {
        this.$message.success('生成链接成功成功！' + res.data.data);
        this.init();
      } else {
        this.$message.error('失败！');
        this.init();

      }
    }).catch(err => {
      this.$message.error('请求出错了：' + err)
    })



  },




  handlePreview(file) {
    window.open(file.response.url);

  },
  filepreview(docid) {

  }

}
};
</script>