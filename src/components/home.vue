<template>
  <el-container>
    <!-- ??? -->
    <el-header style="height: 80px;">
      <el-row style="margin: 0 10px;">
        <el-col :span="20" class="logo-container">
          <div class="logo grid-content bg-purple">
            <img src="../assets/logo.png" alt="">
            <p class="title" style="padding-top: 20px; padding-bottom: 10px;color: black;">你的网盘</p>
          </div>
        </el-col>
      </el-row>
      <el-dropdown style="float: right;">

        <el-avatar style="float: right;height: 60px;width: 60px;margin-top: 10px;margin-bottom: 10px"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="center()">中心</a>
          </el-dropdown-item>
          <el-dropdown-item>
            <a @click="logout()">退出</a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <!-- ?????????????? -->
      <div style="height:1000px;width:200px">
        <el-aside style="width:200px;overflow:hidden">
          <el-row>
            <el-col :span="24">
              <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" router>
                <el-menu-item v-for="route in routesWithoutChildren" :key="route.name" :index="route.path"
                  v-if="route.meta.role == token">
                  <template slot="title">
                    <div>
                      <i :class="route.icon"></i> {{ route.meta.title }}
                    </div>
                  </template>
                </el-menu-item>

                <el-submenu v-for="route in routesWithChildren" :key="route.name" :index="route.path"
                  v-if="route.meta.role == token">
                  <template slot="title">
                    <div>
                      <i :class="route.icon"></i>{{ route.meta.title }}
                    </div>
                  </template>
                  <el-menu-item v-for="subroute in route.children" :key="subroute.name"
                    :index="`${route.path}/${subroute.path}`" :route="{ path: `${route.path}/${subroute.path}` }">
                    <div>
                      {{ subroute.meta.title }}
                    </div>
                  </el-menu-item>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
      </div>
      <!-- ????????????? -->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { apiService } from "../../util/api.js"

export default {

  name: 'home',
  data() {
    return {
      //???????????????

      //??????????????

      //???????

      token: ""
    }
  },
  created() {
    var user = localStorage.getItem("logintoken");
    var userObj = JSON.parse(user);
    var token = userObj.data.userrole;
    this.token = token;
    console.log("44", token);
  },
  mounted() {
    //??????
    // this.getPermission()
    //??????


    this.toHome()
  },
  computed: {
    mainRoutes() {
      return this.$router.options.routes
        .flatMap(route => (route.children ? route.children : []))
        .filter(route => route.menu);
    },
    subRoutes() {
      return this.mainRoutes.filter(route => route.children);
    },
    routesWithChildren() {
      return this.mainRoutes.filter(route => route.children);
    },
    routesWithoutChildren() {
      return this.mainRoutes.filter(route => !route.children);
    },

  },
  methods: {
    //???????????
    _click(func) {
      this[func]()
    },
    //??????
    getPermission() {
      apiService.getPermission().then((res) => {
        let data = res.data

        if (data.code == 0) {
          this.permissionList = data.permission
          this.roleList = data.roleList
        } else {
          this.$confirm('??????!', '???', {
            confirmButtonText: '???',
            cancelButtonText: '???',
            type: 'warning'
          }).then(() => {
            //?????????
            this.$router.push("/login")
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '?????'
            });
          });
        }
      }, (error) => {
        this.$confirm('??????!', '???', {
          confirmButtonText: '???',
          cancelButtonText: '???',
          type: 'warning'
        }).then(() => {
          //?????????
          this.$router.push("/login")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '?????'
          });
        });
      })
    },
    //??????
    getMenuByPid(pid) {
      apiService.getMenu(pid).then((res) => {
        let data = res.data
        if (data.code == 0) {
          this.menuTree = data.data;
        }
      }, (error) => {

      })
    },
    //???????
    isPower(power) {
      if (this.permissionList.includes(power) || this.permissionList.includes("*")) {
        return true;
      }
      return false;
    },


    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome() {
      //???vue????????????????
      if (this.$route.path !== "/") {
        this.$router.push("/home")
      }
    },
    //????????????????????????
    logout() {
      this.$confirm('确认退出, 是否继续?', '确定退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        apiService.logout().then(res => {
          if (res.data.code === 200) {
            this.$message.success('退出成功！');
            this.$router.push("/");
          } else {
            this.$message.error(res.msg || '操作失败');
          }
        }).catch(err => {
          this.$message.error('请求出错了：' + err)
        })
      })
    }




  },
}
</script>

<style scoped>
.el-header {
  background-color: rgba(19, 135, 243, 0.1);
  color: #000000;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid darkgray;
  z-index: 5;
}

.logo {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: inline;
  height: 80px;
}

.logo>img {
  width: 80px;
  height: 80px;
}

.title {
  font-size: 30px;
  line-height: initial;
  font-family: cursive;
  letter-spacing: 3px;
  float: right;
  height: 80px;
  color: white;
}

/* .el-menu 
{
   background-color: rgba(30, 141, 245, 0.1);
   text-align: center;

}
.el-submenu{
   background-color: rgba(30, 141, 245, 0.1);
}
.el-menu-item{
   background-color: rgba(30, 141, 245, 0.1);
} */
.el-aside {
  background-color: rgba(30, 141, 245, 0.1);

}
</style>
