<template>
    <div>
      <!-- 查询条件 -->
      <div >
  
          <el-form v-if="isPower('menu/list')" :inline="true" :model="formInline" class="demo-form-inline">
  
            <el-form-item label="菜单名称">
              <el-input v-model="formInline.menuName" placeholder="菜单名称"></el-input>
            </el-form-item>
  
          
  
  
            <el-form-item>
  
              <el-button v-if="isPower('menu/list')" type="primary" @click="query">查询</el-button>
              <el-button v-if="isPower('menu/add')" type="primary" @click="addPro">添加</el-button>
            </el-form-item>
          </el-form>
      </div>
      <!-- 内容显示 -->
      <div>
            <template>
              <el-table
                  v-loading="loadingData"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                :show-overflow-tooltip="true"
                  fixed
  
                  prop="menuName"
                  label="菜单名称"
                  width="150">
                </el-table-column>
  
                <el-table-column
                :show-overflow-tooltip="true"
                  prop="menuUrl"
                  label="请求路径"
                  width="150">
                </el-table-column>
  
                <el-table-column
                :show-overflow-tooltip="true"
                  prop="menuPidName"
                  label="父节点"
                  width="150">
                </el-table-column>
  
                <el-table-column
                    prop="menuType"
                    label="菜单类型">
                    <template slot-scope="scope">
                        <div v-if="scope.row.menuType==1">功能</div>
                        <div v-if="scope.row.menuType==0">菜单</div>
                    </template>
                </el-table-column>
  
  
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="auto">
                  <template slot-scope="scope">
                   <el-button v-if="isPower('menu/delete')" @click="deleteById(scope.row.menuId)"  type="danger" icon="el-icon-delete" circle ></el-button>
                   <el-button v-if="isPower('menu/update')" @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            </div>
  
            <!-- 分页参数 -->
            <div>
              <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagerArg.current"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pagerArg.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagerArg.total">
                  </el-pagination>
                </div>
  
            </div>
  
            <!-- 添加表单 -->
            <div>
  
  
                <el-dialog title="添加菜单" :visible.sync="isShowAddForm">
                  <el-form :model="addForm" :rules="rules" ref="addForm" class="demo-ruleForm">
                    <el-form-item label="菜单名称"  prop="menuName">
                      <el-input v-model="addForm.menuName"></el-input>
                    </el-form-item>
  
                    <el-form-item label="菜单请求路径"  prop="menuUrl">
                      <el-input v-model="addForm.menuUrl" ></el-input>
                    </el-form-item>

                    <el-form-item label="菜单类型" prop="menuType">
                        <el-select v-model="addForm.menuType" placeholder="请选择菜单类型">
                          <el-option label="功能" :value="1"></el-option>
                          <el-option label="菜单" :value="0"></el-option>
                        </el-select>
                      </el-form-item>
  
                    <el-form-item label="菜单点击方法名"  prop="menuClick">
                      <el-input v-model="addForm.menuClick" ></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图标"  prop="menuIcon">
                      <el-input v-model="addForm.menuIcon" ></el-input>
                    </el-form-item>
  
                     <el-form-item label="父节点列表" prop="menuPidList">
                        <el-radio-group v-model="addForm.menuPidList">
                            <el-radio v-for="item in menuPidList"
                          :key="item.menuid"
                          :label="item"
                          name="type">{{item.menuName}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
  
                      
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="isShowAddForm = false">取 消</el-button>
                    <el-button type="primary" @click="submitFormAdd('addForm')">确 定</el-button>
                  </div>
                </el-dialog>
  
            </div>
  
            <!-- 编辑表单 -->
            <div>
  
              <el-dialog title="编辑菜单信息" :visible.sync="dialogFormVisibleEdit">
                <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">


                    <el-form-item label="菜单名称"  prop="menuName">
                      <el-input v-model="editForm.menuName"></el-input>
                    </el-form-item>
  
                    <el-form-item label="菜单请求路径"  prop="menuUrl">
                      <el-input v-model="editForm.menuUrl" ></el-input>
                    </el-form-item>

                    <el-form-item label="菜单类型" prop="menuType">
                        <el-select v-model="editForm.menuType" placeholder="请选择菜单类型">
                          <el-option label="功能" :value="1"></el-option>
                          <el-option label="菜单" :value="0"></el-option>
                        </el-select>
                      </el-form-item>
  
                    <el-form-item label="菜单点击方法名"  prop="menuClick">
                      <el-input v-model="editForm.menuClick" ></el-input>
                    </el-form-item>
                    <el-form-item label="菜单图标"  prop="menuIcon">
                      <el-input v-model="editForm.menuIcon" ></el-input>
                    </el-form-item>
  
                    <el-form-item label="父节点列表" prop="menuPidList">
                        <el-radio-group v-model="editForm.menuPidList">
                            <el-radio v-for="item in menuPidList"
                          :key="item.menuid"
                          :label="item"
                          name="type">{{item.menuName}}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                </el-form>
  
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                  <el-button type="primary" @click="submitFormEdit('editForm')">确 定</el-button>
                </div>
              </el-dialog>
  
  
            </div>
  
  
  
    </div>
  </template>
  
  <script>
    import {isDataValid} from "../../util/validate"
      import {apiService} from "../../util/api"
  
   export default{
     name:"menulist",
     props:['permissionList'],
     mounted() {
       // console.log("父组件传值:"+this.permissionList)
       this.pager(this.pagerArg.current,this.pagerArg.size,this.formInline)
     },
     data() {
       return{
  
         //表格数据
         tableData:[],
         //分页参数
         pagerArg:{
           current:1,//当前页码
           total:0,//总条数
           size:5//每页显示条数
         },
         //角色
         o:{
          page:1,
          limit:-1,
         },
         //查询条件
         formInline:{
           menuId:null,//菜单Id
           menuName:null,//菜单名称
         },
         //添加表单数据
         addForm: {
           menuName: '',
           menuUrl: '',
           menuPid:'',
           menuType:'',
           menuClick:'',
           menuIcon:'',
           state:'',
           menuPidList:[],//父节点列表
         },
         //编辑表单数据
         editForm: {},
  
        
         //数据是否还在加载
         loadingData: false,
         //添加表单显示与否
         isShowAddForm: false,
         //编辑表单显示与否
         dialogFormVisibleEdit:false,
         //表单显示大小
         formLabelWidth: '120px',
         role:{
           rolename:'',//角色名
         },
         menuPidList:[],//可用父节点列表
  
         // 数据验证标准
         rules:{
            menuName: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
          menuUrl: [
            { required: true, message: '请输入菜单请求路径', trigger: 'blur' },
          ],
          menuClick: [
            { required: true, message: '请输入菜单点击方法名', trigger: 'blur' },
          ],
          menuIcon: [
            { required: true, message: '请输入菜单图标', trigger: 'blur' },
          ],
            menuPidList: [
            { required: true, message: '请选择父节点', trigger: 'change' }
          ],
          menuType: [
            { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
         },
  
       }
     },
  
     methods:{
       //消息提示方法
       msg(type,msg) {
  
         //type:success,warning,error
               this.$message({
                 showClose: true,
                 message: msg,
                 type: type
               });
             },
         //重置表单
          resetForm(formName) {
                 this.$nextTick(()=>{
                     this.$refs[formName].resetFields();
                 })
               },
          //权限判断
          isPower(power){
            // if(this.permissionList.includes(power)||this.permissionList.includes("*")){
            //   return true;
            // }
            // return false;
            return true;
          },
          // 失败状态码处理
          codeHandle(code,msg){
            if(code==10000){
              this.loginTips();
            }else if(code==10006){
              this.loginTips();
            }else if(code==10005){
              this.loginTips();
            }else if(code==10005){
              this.loginTips();
            }else if(code==10099){
              this.loginTips();
            }else if(code==30001){
              this.msg('warning',msg)
            }
            else{
              this.msg('error',msg)
            }
          },
          //弹出提示登录框
          loginTips(){
              this.$confirm('请先登录!', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        //跳转到登录页
                        this.$router.push("/login")
                      }).catch(() => {
                        this.$message({
                          type: 'info',
                          message: '已取消'
                        });
                      });
            },
         //分页查询
         pager(pageNum,pageSize,entity){
           entity.page=pageNum;
           entity.limit=pageSize;
           apiService.getMenuList(entity).then((res)=>{
             let data=res.data
             if(data.code==0){
               this.tableData=data.data.records
               console.log("111")
               console.log(this.tableData)
               console.log("22")
               this.pagerArg=data.data
             }else {
               this.msg('error',data.msg)
             }
           },(error)=>{
             this.msg('error','系统错误请联系管理员')
           })
         },
         //编辑
         handleEdit(row){
            //重置表单
            this.resetForm('editForm')
            // this.editForm=row
            this.editForm=JSON.parse(JSON.stringify(row))
            // console.log(this.editForm)
            this.dialogFormVisibleEdit=true
            //获取可用角色列表
            //获取可用角色列表
            apiService.getMenuPidList().then((res)=>{
              if(res.data.code==0){
                this.menuPidList=res.data.data
              }
            },(error)=>{
  
            })
            this.roleIds=[];
            for(var i=0;i<row.roleList.length;i++){
              this.roleIds.push(row.roleList[i].roleId);
            };
  
  
          },
          //提交编辑表单
          submitFormEdit(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log(this.editForm)
                this.editForm.menuPid = this.editForm.menuPidList.menuId
                //提交请求
                apiService.updateMenu(this.editForm).then((res)=>{
                    const msg=res.data
                    if(msg.code==0){
                      this.msg('success','修改成功');
                      this.dialogFormVisibleEdit = false
                      //刷新本页面
                      this.pager(this.pagerArg.current,this.pagerArg.size,this.formInline);
                    }else{
                      this.codeHandle()
                      this.msg(msg.code,msg.msg)
                    }
  
  
                  },(error)=>{
                    this.msg("error","请求失败")
                });
              } else {
  
                return false;
              }
            });
  
          },
         //删除
         deleteById(id){
            //
             this.$confirm('此操作将永久删除菜单, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      //开始删除
                      apiService.deleteMenu(id).then((res)=>{
                        let data=res.data
                        if(data.code==0){
                          this.msg('success','删除成功!');
                          this.pager(this.pagerArg.current,this.pagerArg.size,this.formInline)
                        }else{
                          this.codeHandle(data.code,data.msg)
                        }
  
                      },(error)=>{
                        this.codeHandle('error','请求失败')
                      })
  
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });
  
  
          },
         //条件查询
         query(){
  
           this.pager(1,this.pagerArg.size,this.formInline)
         },
         // 分页大小改变
           handleSizeChange(val) {
  
             //计算当前页码
             var size = (this.pagerArg.current-1)*this.pagerArg.size;
             this.pagerArg.size=val;
             if(size%val==0){
  
               this.pager(size/val,val,this.formInline)
             }else if(size==0){
  
               this.pager(1,val,this.formInline)
             }else{
  
               this.pager(parseInt(size/val)+1,val,this.formInline)
             }
                 },
         //更改页码
         handleCurrentChange(val) {
           //页码跳转
           this.pager(val,this.pagerArg.pageSize,this.formInline);
         },
  
         //
         addPro(){
        
          //获取可用菜单父节点列表
          apiService.getMenuPidList().then((res)=>{
            let data=res.data
            if(data.code==0){
              //显示表单
  
              this.isShowAddForm=true;
              //将父节点信息赋值给data
              this.menuPidList=data.data;
  
            }else{
              this.msg('error',data.msg)
            }
          },(error)=>{
            this.msg('error','系统出错！请稍后重试')
          })
         },
         //提交添加表单
         submitFormAdd(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
  
                // console.log(this.addForm.menuPidList.menuId)
                this.addForm.menuPid=this.addForm.menuPidList.menuId
                console.log(this.addForm)
                //提交请求
                apiService.addMenu(this.addForm).then((res)=>{
                    const msg=res.data
                    if(msg.code==0){
                      this.msg('success',msg.msg)
                      this.isShowAddForm = false
                      this.pager(this.pagerArg.current,this.pagerArg.size,this.formInline)
                    }else{
                      this.codeHandle(msg.code,msg.msg)
                    }
                  },(error)=>{
                    this.msg("error","请求失败")
                });
  
  
              } else {
                this.msg('warning','请确认表单')
                return false;
              }
            });
         }
     }
  
   }
  </script>
  
  <style>
  </style>
  