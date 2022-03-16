//注意：每次调用$,get()或post或ajax时，
//会先调用ajaxPrefilter函数

$.ajaxPrefilter(function(options){
    console.log(options.url)
    options.url = 'http://www.liulongbin.top:3007'+options.url
})