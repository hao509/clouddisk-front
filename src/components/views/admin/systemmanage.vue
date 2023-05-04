<template>
    <el-button type="primary" @click="downloadDatabaseBackup();">数据库备份</el-button>
</template>

<script>
import { apiService } from '../../../../util/api'
export default {
    
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
  },
};


</script>

<style></style>