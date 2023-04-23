<template>
    <div>
        <div>
            <el-input v-model="searchText" placeholder="请输入提取码关键字">
                <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
            </el-input>
        </div>


        <el-table :data="tableData" stripe class="tableBox" @selection-change="handleSelectionChange">

            <el-table-column prop="shareid" label="分享id"></el-table-column>
            <el-table-column prop="userid" label="分享者"></el-table-column>
            <el-table-column prop="docid" label="文件id"></el-table-column>

            <el-table-column prop="docplace" label="文件地址"></el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">

                    <el-button type="text" size="small" class="delBut non" @click="geturl(scope.row.shareid)">
                        获取
                    </el-button>

                </template>
            </el-table-column>
        </el-table>


    </div>
</template>
<script>
import { apiService } from '../../../../util/api'
import { isDataValid } from "../../../../util/validate.js"
//D:\zpfront\my-plan\util
//D:\zpfront\my-plan\src\components\views\user\first.vue
//my-plan\util\api.js
export default {
    name: 'fileList',
    data() {
        return {
            page: 1,
            pageSize: 5,
            searchText: '',

            tableData: [],

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




    methods:
    {

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
            apiService.getSharePage(params).then(res => {
                console.log(params)
                if (String(res.data.code) === '200') {
                    this.tableData = res.data.data.records || []
                    this.counts = res.data.data.total
                }
            }).catch(err => {
                this.$message.error('请求出错了：' + err)
            })
        },


        geturl(shareid) {
            var token = localStorage.getItem("logintoken");
            console.log(token);
            var userObj = JSON.parse(token);
            token = userObj.data.id

            apiService.geturl(shareid, token).then(res => {
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

        },
        search() {

            // 处理搜索逻辑
            console.log('搜索关键字：', this.searchText);
            if (!isDataValid(this.searchText)) {
                this.$message.error('请输入内容')

            } else {
                var str = this.searchText;
                console.log(str)
                apiService.getsharefile(str).then(res => {
                    const filename = res.headers['content-disposition'].split('filename=')[1];
                    const blob = new Blob([res.data], { type: res.headers['content-type'] });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);



                    if (res) {
                        this.$message.success('下载成功！');

                    } else {
                        this.$message.error(res.msg || '操作失败');
                    }
                }).catch(err => {
                    this.$message.error('请求出错了：' + err)
                })




            }
        },
        clearSearch() {
            // 清空搜索框
            this.searchText = '';
        }

    }
};
</script>