// pages/collection/collection.js
var courseList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
	 isShowBackcolor:'#FFF',
      titleText: '收藏', // 导航栏 中间的标题
	  backIcon:'',//返回按钮
	show:false,
  },
   //查看详情跳转
  detali:function(e) {
	var id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../curriculum/details?id='+ id,
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     /**
   *  获取课程收藏列表
   */
		let _this = this;
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
			  var data = res.data.msg;
			  var student_id=res.data.student_id;
			  var collection=[];
			  var type = 2;
			  for(var i=0;i<data.length;i++){
				  if(data[i].collection==1){
					  type = 1;
				  }
			 }
			_this.setData({
					type:type,
				    course:res.data.msg,
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
  //底部导航跳转
  onTabItemTap(item) {
	this.onLoad();
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
	 var number = huanc.number;
	wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/collection',
      data: {
		 course_id:course_id,
		 unionid:unionid,
		 number:number,
		 collection:collection
		
	  },
	  //回调数据
      success:function(res){
		var collection = e.currentTarget.dataset.collection;
		_this.setData({
		 collection: collection	
		});
		 wx.showToast({
		icon: 'success',
        title: res.data.msg,
        duration: 1000,
		success:function(data){
		_this.onLoad();
		
			 }
      })
	  }
	 
     });
		
	},
	




  /**
   * 生命周期函数--监听页面显示
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