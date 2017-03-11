const  content_url='http://route.showapi.com/955-2';
const  list_url='http://route.showapi.com/955-1';
const  showapi_sign='e4bfd9f15682458b9efd5727c1fee7d9';
const  showapi_appid=33400;
Page({
    data:{
     listData:{},
      t:true,
      f:false,
      content:{},
      page:1,
     
    },

    onLoad:function(){
      
      var that=this;
     wx.request({
       url:list_url,
       data: {
           type:'yy',
           page:1,
           showapi_appid:33400,
           showapi_sign:'e4bfd9f15682458b9efd5727c1fee7d9',
       },
       method: 'GET', 
       success: function(res){
           console.log(res.data.showapi_res_body.pagebean.contentlist)
      
          that.setData({
              listData:res.data.showapi_res_body.pagebean,
              page:res.data.showapi_res_body.pagebean.currentPage,
            //  oldcontent:res.data.showapi_res_body.pagebean.contentlist,

          })
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
   

    },

change:function(e){
    var that=this;
      console.log( e.target.dataset.id)
      that.setData({
          t:false,
          f:true,
          
      })
    
       wx.request({
         url: content_url,
         data: {
             id:e.target.dataset.id,
             page:1,
             showapi_appid:33400,
           showapi_sign:'e4bfd9f15682458b9efd5727c1fee7d9',


         },
         method: 'GET', 
         success: function(res){
            res.data.showapi_res_body.text=res.data.showapi_res_body.text.replace(/shoye\_336\(\)\;/,'');
          res.data.showapi_res_body.text=res.data.showapi_res_body.text.replace(/\&nbsp\;/g,'');
           //    console.log(res.data.showapi_res_body)
           that.setData({
               content:res.data.showapi_res_body.text
               
           })
         },
         fail: function() {
           // fai
         },
         complete: function() {
           // complete
         }
       })

    },

    back:function(){
     
      this.setData({

          t:true,
          f:false,

      })


    },

    onReachBottom:function(){

        var that=this;
        
        //console.log(that.data.page)
        ++that.data.page;

        wx.request({
          url: list_url,
          data: {
              type:'yy',
             page:that.data.page,
             showapi_appid:33400,
             showapi_sign:'e4bfd9f15682458b9efd5727c1fee7d9',
          },
          method: 'GET', 
       
          success: function(res){
              
           var oldContent=that.data.listData.contentlist;
           var newContent=res.data.showapi_res_body.pagebean.contentlist
           res.data.showapi_res_body.pagebean.contentlist=oldContent.concat(newContent)
             
           that.setData({
               listData: res.data.showapi_res_body.pagebean,
           })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })

    }
})