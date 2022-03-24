$(function(){
    var laypage = layui.laypage
  
  //总页数低于页码总数
  laypage.render({
    elem: 'demo0'
    ,count: 50 //数据总数
  })
})