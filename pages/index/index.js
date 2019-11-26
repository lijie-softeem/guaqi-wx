//index.js
//获取应用实例
const app = getApp();
var courseList = [];
Page({
  data: {

	isShowBackcolor:'#fff',
    titleText: '呱奇编程·少儿编程领先品牌', // 导航栏 中间的标题
	backIcon:'',//返回按钮
	hidden:false,
	show:true,
	code:'whrd',
    datas: '',
  //轮播图
    "bnrUrl": [{
      "url": "https://api.guaqi.vip/home/Common/images/lun.png",
	  "title":"在线报名",
	  "back":"#4E345B",
    }, {
        "url":"img/lunbo.png",
		"title":"免费试听",
		"back":"#FE5444",
    }],
	

	
  },
  
   /*  跳转在线预约 */
  appointment:function(e) {
      wx.navigateTo({
		 
        url: '../appointment/appointment',
      })
  },
   // 新闻
  jumpDetails: function (e) {

    wx.navigateTo({
      url: '../new/new?id=' + e.currentTarget.dataset.id,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取课程列表
	var _this = this;
	
	var huanc = wx.getStorageSync('unionid');
	var unionid=huanc.unionid;
            var limit=2;
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/course',
		  data: {
			unionid:unionid,
			limit:limit
		  },
		  //回调数据
		  success:function(res){
        courseList = res.data.msg;
	    var student_id=res.data.student_id;
		var count = res.data.count;
			_this.setData({
				course: courseList,
				count:count,
				student_id:student_id
			});
		  }
		 });
	/* this.getCouponList(); */
	this.onReachBottom();
	
  },
  
    // 悬浮图标
  adddetial: function () {
    wx.navigatorTo({

      url: '',

      success: function (res) { },

      fail: function (res) { },

      complete: function (res) { },

    })

  },



	  /**
	   * 写入收藏列表
	   */
  collection:function(e){
		 let _this = this;
		 var id = e.currentTarget.id;//下标
		 var course_id = e.currentTarget.dataset.id;//课程id
		 var collection = e.currentTarget.dataset.collection;//传值标识
	     var course =_this.data.course;
		 for (var i = 0; i <course.length; i++){ 
		  if (course[i].id == course_id){
			course[i].collection = course[i].collection == 1?2:1;
			_this.setData({
			  course: course,
			});
		  
      }
     }
	 var huanc = wx.getStorageSync('unionid');
	 var unionid=huanc.unionid;
	 //获取用户手机号
	 var number =huanc.number;
	wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/collection',
      data: {
		 collection:collection,
		 course_id:course_id,
		 unionid:unionid,
		 number:number,
		
	
	  },
	  //回调数据
      success:function(res){
		
		_this.setData({
		});
	wx.showToast({
		icon: 'success',
        title: res.data.msg,
        duration: 500,
		success:function(data){
        _this.onShow();
			 }
      })
	  }
	 
     });
		
	},
  /**
   * 页面下拉触底事件的处理函数
   */
  onReachBottom: function () {
	 let _this = this;
	 let page =_this.data.page;
			
    wx.request({
      url: 'https://api.guaqi.vip/index.php/News/index_news',
      data: {
		  page:page,
	  },
	  //回调数据
      success:function(res){
			++page;
			
			if(res.data.msg){
				
				if(res.data.msg.length==6){
					 wx.stopPullDownRefresh;
					 _this.setData({
							hidden:true,
							show:false,
						});
					 
					 return false;
					
					}
			  if( _this.data.datas){
					 var datas = _this.data.datas.concat(res.data.msg);
						_this.setData({
							datas:datas ,
							hidden:true,
							page:page,
						});
					  }else{
						  
						  _this.setData({
							datas:res.data.msg ,
							hidden:true,
							page:page,
						});
				}
				
		}
		 _this.setData({
             hidden:false,
			 show:true,
				
            });
      }

    });
	  
     
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
 /*  跳转在线预约 */
  navigationTo:function(e) {
      wx.navigateTo({
		 
        url: '../appointment/appointment',
      })
  },
/*  跳转优秀作品 */
    navigationTohome:function(e) {
      wx.navigateTo({
		 
        url: '../works/works',
      })
  },
  /*  跳转新闻详情 */
  navigationTonew:function(e) {
      wx.switchTab({
        url: '../new/new',
      })
  },

    /*  跳转课程信息 */
  navigationTodeta:function(e) {
	 
      wx.navigateTo({
		 
        url: '../curriculum/curriculum',
      })
  },
  /*  跳转课程详情 */
 detali:function(e) {
	 var id = e.currentTarget.dataset.id;
	
      wx.navigateTo({
		 
        url: '../curriculum/details?id='+ id,
      })
  },
  /*  跳转校区展示 */ 
  navigationTodh:function(e) {
	 
      wx.navigateTo({
		 
        url: '../campus/campus',
      })
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//获取当前页数
	var page = options.page
	if(!page || page == 'undefined'){
		page = 0;
	}
    this.setData({
      page: page,
    })
  },

  /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
  methods: {

   

  }
  
})
