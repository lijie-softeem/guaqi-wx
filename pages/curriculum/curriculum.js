// pages/curriculum/curriculum.js
Page({

 /**
* 页面的初始数据
*/
data:{
	searchData:'',
	code:'132',
	good:false,
	file:true,
    inputValue: '', //搜索的内容
    isShowBackcolor:'#FA9956',
    titleText: '课程信息', // 导航栏 中间的标题
	backIcon:'1',//返回按钮
},

    //搜索框文本内容显示
    inputBind: function(event) {
		
        this.setData({
            inputValue: event.detail.value
        })
    },

 //查看详情跳转
 
  navigationTodeta:function(e) {
	var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../curriculum/details?id='+ id,
      })
  },
  //搜索
   query:function(e) {
		 var _this=this;
		 var id = e.currentTarget.id;//下标
		 var course_id = e.currentTarget.dataset.id;//课程id
		 var collection = e.currentTarget.dataset.collection;//传值标识
		 var huanc = wx.getStorageSync('unionid');
	     var unionid=huanc.unionid;
		 var number = huanc.number;
		 var inputValue =_this.data.inputValue;
		if(inputValue == ''){
			 wx.showToast({
			icon: 'none',
			title: '请输入搜索词',
			duration: 1000,
			success:function(){
			
			_this.getCurriculum();
				 }
		  })
		}
		 wx.request({
		url: 'https://api.guaqi.vip/index.php/Course/course',
		data: {
			inputValue: _this.data.inputValue,
			unionid:unionid
		},
		method: 'GET',
		success: function(res) {
			//搜索后的课程
			var searchData = res.data.msg;
			var code=res.data.code;
			_this.setData({
				code:code,
				searchData:searchData,
				file:false,
				good:true,
			
			});
		
		
			}
		});
	  },
    
	

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	let _this = this;
	//提取全局缓存  unionid  number
	var huanc = wx.getStorageSync('unionid');
	var unionid=huanc.unionid;
	var collection = _this.data.collection;
    wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/course',
      data: {
		unionid:unionid
	  },
	  //回调数据
      success:function(res){
		   var student_id=res.data.student_id;
		  //所有课程
		_this.setData({
			course:res.data.msg,
			collection:collection,
			file:true,
			good:false,
			student_id:student_id
		});
	  }
     });
	
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
	/**
	   * 写入收藏列表
	   */
  collection:function(e){
	 let _this = this;
	 var id = e.currentTarget.id;//下标
	 var course_id = e.currentTarget.dataset.id;//课程id
	 var collection = e.currentTarget.dataset.collection;//传值标识
	//立即切换心型图片
	var course =_this.data.course;
	for (var i = 0; i <course.length; i++){ 
	  if (course[i].id == course_id){
		course[i].collection = course[i].collection == 1?2:1;
		_this.setData({
		  course: course,
		});
		}
	}
	//立即切换 课程搜索   心型图片
		var searchData =_this.data.searchData;
		for (var i = 0; i <searchData.length; i++){ 
		  if (searchData[i].id == course_id){
			searchData[i].collection = searchData[i].collection == 1?2:1;
			_this.setData({
			  searchData: searchData,
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
   * 获取课程列表
   */
  onShow: function () {
    
	
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})