//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    now:1,
    imgArr:[],
    isShow:false,
    radioList:[],
    songList:[],
    topList:[],
    songList2:[],
    isHidden:false,
    hotsong:{},
    search_songlist:[],
    value:'',
    page:1,
    allpage:10000
  },

   

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this;
    wx.request({
      url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=966752309&uin=1670381264&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489043107476',
      data: {},
      method: 'GET',
      success: function(res){
     //   console.log(res.data.data)
        that.setData({
          imgArr:res.data.data.slider,
          radioList:res.data.data.radioList,
          songList:res.data.data.songList,
        })
      },
      fail: function() {
       
      },
      complete: function() {
        // complete
      }
    }),

   wx.request({
     url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=json&g_tk=966752309&uin=1670381264&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489063061469',
     data: {},
     method: 'GET', 
     success: function(res){
       //console.log(res.data.data.topList)
       that.setData({
        topList:res.data.data.topList,
        songList2:res.data.data.topList

        
       })
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   }),

   wx.request({
     url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=1807713253&uin=745659221&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489144291094',
     data: {},
     method: 'GET',
     success: function(res){
       
       that.setData({
         hotsong:res.data.data
       })

        //console.log(res.data.data)
     },
     fail: function() {
       // fail
     },
     complete: function() {
       // complete
     }
   })

  },


buttonClick(e){

  console.log(e.target)
  console.log(e.target.dataset)
  console.log(e.target.dataset.index)

   this.setData({
     now:e.target.dataset.index,
     isShow:!this.data.isShow
   });
   console.log(this.data.now)
   console.log(this.data.isShow)
},

focus(){
  
  this.setData({
    isHidden:true,
  })

},

cancle(){
this.setData({
  isHidden:false,
  value:''

})

},

search(e){

 
 var that=this;
 //console.log(e.target.dataset.id)
  that.setData({
    isHidden:true,
    value:e.target.dataset.id,
     
  })
 wx.request({
   url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1807713253&uin=745659221&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1489150602902",
   data: {
     w:e.target.dataset.id
   },
   method: 'GET', 
   success: function(res){
     console.log(res.data.data)
    that.setData({
    search_songlist:res.data.data.song.list,
    allpage:Math.ceil(res.data.data.song.totalnum/res.data.data.song.curnum)
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




  input(e){

    console.log(e.detail.value)
    this.setData({     
       value:e.detail.value
    })

  },

  fdj(){
 
    var that=this;

    that.setData({
    isHidden:true,
    
  })
    wx.request({
      url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1807713253&uin=745659221&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&remoteplace=txt.mqq.all&_=1489150602902",
      data: {
        w:that.data.value,
        p:1,
        
      },
      method: 'GET',
      success: function(res){    
        console.log(res.data.data)
        that.setData({
    search_songlist:res.data.data.song.list,
       
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

  onReachBottom(){
 
     var that=this;
     console.log(that.data.allpage)
     if(that.data.page>=that.data.allpage)
     {
      
       return;
     }
     ++that.data.page;
     console.log(that.data.page)
     wx.request({
       url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1807713253&uin=745659221&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&remoteplace=txt.mqq.all&_=1489150602902",
       data: {
          p:that.data.page,
          w:that.data.value,
       },
       method: 'GET', 
       success: function(res){
        console.log(res.data.data.song)
        that.setData({
        search_songlist:res.data.data.song.list,
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
