//判断是否为空
///function(data){}   ==> (data)=>{} 箭头函数
export const isDataValid=(data)=>{
    if(data!=null && data!=="" && data!=="undefined" && data!==null && data!=undefined){
        return true
    }
    return false
}