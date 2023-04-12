//编写数据请求接口
import axios from "axios";


export const apiService = {
  // 登录api
    login(params){
        return axios.post("/api/user/login",params)
    },
    logout(params){
        return axios.get("/api/user/logout")
    },
    register(params){
      return axios.post("/api/user/register",params)
    },
    //获取文件列表
    getFilePage(params){
      return axios.get("/api/updata/filelist",{
        params: {
          page: params.page,
          pagesize: params.pagesize,
          name: params.name
        }
      })
    },
    //删除文件
    deleteFile(docid){
      return axios.get("/api/updata/filedelete?docid="+docid)
    },
    download(docfakename,token){
      return axios.post("/api/updata/download?docfakename="+docfakename+"&token="+token)
    },
    //获取菜单
    getMenu(pid){
      return axios.get("/api/menu/tree/"+pid);
    },
    //菜单管理
    //获取菜单列表
    getMenuList(params){
      return axios.post("/api/menu/list",+params)
    },
    //获取可用的父节点
    getMenuPidList(){
      return axios.get("/api/menu/getMenuPidList")
    },
    //添加菜单
    addMenu(menu){
      return axios.post("/api/menu/add",menu)
    },
    //修改菜单
    updateMenu(menu){
      return axios.post("/api/menu/update",menu)
    },
    //删除菜单，menu_state改为0
    deleteMenu(id){
      return axios.post("/api/menu/delete/"+id)
    },
    upData(file){
      return axios.post("/api/updata/userupdata",file,
      {headers:{
        'token': usertoken

      }})

    }
}

