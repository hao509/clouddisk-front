//编写数据请求接口
import axios from "axios";


export const apiService = {
  // 登录api
  login(params) {
    return axios.post("/api/user/login", params)
  },
  logout() {
    return axios.get("/api/user/logout")
  },
  register(params) {
    return axios.post("/api/user/register", params)
  },
  //获取文件列表
  getFilePage(params) {
    return axios.get("/api/updata/filelist", {
      params: {
        page: params.page,
        pagesize: params.pagesize,
        name: params.name
      }
    })
  },

  getSharePage(params) {
    return axios.get("/api/updata/sharelist", {
      params: {
        page: params.page,
        pagesize: params.pagesize,
        name: params.name
      }
    })
  },
  //删除文件
  deleteFile(docid) {
    return axios.get("/api/updata/filedelete?docid=" + docid)
  },
  download(docid, token) {
    return axios.post("/api/updata/download", {
      docid: docid,
      token: token
    }, {

      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  //
  fileshare(docid, token) {
    return axios.post("/api/updata/getshareurl?docid=" + docid + "&token=" + token)
  },
  geturl(shareid, token) {
    return axios.post("/api/updata/shareurl?shareid=" + shareid + "&token=" + token

    )
  },
  getsharefile(str) {
    return axios.post("/api/updata/getsharefile", str, {
      headers: {
        'Content-Type': 'text/plain'
      },
      responseType: 'blob',
    })
  },
  forgetpassword(params){
    return axios.post("/api/user/forgetpassword", params)

  },
  getwater(token){
    return axios.post("/api/view/water",{
      token: token
    })
  },
  getbackup(){
    return axios.get("/api/db/database-backup",
    {
      responseType: 'blob'
    })
  },


  //获取菜单
  getMenu(pid) {
    return axios.get("/api/menu/tree/" + pid);
  },
  //菜单管理
  //获取菜单列表
  getMenuList(params) {
    return axios.post("/api/menu/list", +params)
  },
  //获取可用的父节点
  getMenuPidList() {
    return axios.get("/api/menu/getMenuPidList")
  },
  //添加菜单
  addMenu(menu) {
    return axios.post("/api/menu/add", menu)
  },
  //修改菜单
  updateMenu(menu) {
    return axios.post("/api/menu/update", menu)
  },
  //删除菜单，menu_state改为0
  deleteMenu(id) {
    return axios.post("/api/menu/delete/" + id)
  },
  upData(file) {
    return axios.post("/api/updata/userupdata", file, {
      headers: {
        'token': usertoken

      }
    })

  }
}
