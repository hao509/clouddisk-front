<template>
  <div>
  <div>
    <el-button type="primary" @click="downloadDatabaseBackup();">数据库备份</el-button>
    <el-button type="primary" @click="downloadLog();">导出日志</el-button>
  </div>
  <div>
    <el-table :data="logData" stripe class="logBox">

      <el-table-column prop="opid" label="日志id"></el-table-column>
      <el-table-column prop="opmethod" label="操作方式"></el-table-column>
      <el-table-column prop="opdate" label="操作时间"></el-table-column>
      <el-table-column prop="opres" label="返回结果"></el-table-column>
       <el-table-column prop="opip" label="操作ip"></el-table-column>
     

    
    
    </el-table>
  </div>
  </div>
</template>

<script>
import { apiService } from '../../../../util/api'
export default {
name: 'logList',
data(){
  return {
    
      opid: '',
      opmethod:'',
      logData: [],
      opdate: '',
      opres:'',
      idstatus:'',
      opip:'',
     
    }
},
 created() {
    this.init()
  },

  methods: {
    downloadDatabaseBackup() {
      apiService.getbackup().then((response) => {
        const backupStatus = response.headers["x-backup-status"];

        if (backupStatus === "success") {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "database_backup.sql"); // 为下载的文件指定文件名
          document.body.appendChild(link);
          link.click();
          link.remove();
          this.$message.success('备份成功');
        } else {
          console.error("文件生成失败");
          // 根据需要处理错误
        }
      });
    },
    init(){
      apiService.getlog().then(res=>{
        if(res.data.code == 200){
          this.logData = res.data.data|| []
          this.counts = res.data.data.total
        }
      }).catch(err=>{
         this.$message.error('请求出错了：' + err)
      })
    },
 
    downloadLog(){
      
      apiService.getlogexcel().then(res=>{
        const contentType = res.headers['content-type'];
      let blob = new Blob([res.data], {
          type: contentType 
        })
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = 'log.xlsx'
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
      }).catch((err) => { console.log(err) })
      
    
  },
}
}


</script>

<style></style>