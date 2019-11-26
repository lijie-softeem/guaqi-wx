// pages/homepage/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     isShowBackcolor:'#FFF',
      titleText: '积分兑换', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	     var _this = this;
		 var huanc = wx.getStorageSync('unionid');
		 var unionid=huanc.unionid;
		 if(options){
			 var student_id = options.student_id;   
		  }
		  console.log(student_id);
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/Exchange',
		  data: {
			unionid:unionid,
			student_id:student_id,
		  },
		  //回调数据
		  success:function(res){
         var integral=res.data.msg;
         var integral_status=res.code;
			  if(integral_status==200){
				  for(var i=0;i<integral.length;i++){
					  if(integral[i]['add'])
						  integral[i]['add']= parseInt(integral[i]['add']);
				  }
				  var student_integral=parseInt(res.data.datas);
				  _this.setData({
					  integral:integral,
					  student_integral:student_integral,
					  student_id:student_id
				  });
			  }else{
				  _this.setData({
					  student_integral:res.data.datas,

					  student_id:student_id
				  });
			  }
		//改变积分数据类型 进行对比

		  }
		 });
		
  },
  //跳转兑换记录
  navigationTodeta:function(e) {
	  var student_id =e.currentTarget.dataset.student_id;
      wx.navigateTo({
        url: '../integral/details?student_id='+student_id,
      })
  },
  //积分兑换
	integral:function(e){
		 var _this = this;
		 var huanc = wx.getStorageSync('unionid');
		 var unionid=huanc.unionid;
		 var student_id = _this.data.student_id;
		 var prize = e.currentTarget.dataset.prize;//商品名字
		 var point = e.currentTarget.dataset.point;//商品积分
		 var id= e.currentTarget.dataset.id;//商品id
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/Exchange_Record',
		  data: {
			unionid:unionid,
			student_id:student_id,
			point:point,
			prize:prize,
			id:id,
		  },
		  //回调数据
		  success:function(res){
			  if(res.data.code == 300){
				wx.showToast({
				 title: res.data.msg,
				 icon: 'none',
				 duration: 2000,//持续的时间
				 success:function(data){
				setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
				  
                url: '/pages/homepage/integral/integral'
              })
            }, 1000)
				 }
				
			   });
				  
			  }else{
				 wx.showToast({
				 title: '兑换成功',
				 icon: 'success',
				 duration: 2000,//持续的时间
				 success:function(data){
				setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
                url: '/pages/homepage/integral/integral?student_id='+student_id,
              })
			  
            }, 1000)
				 }
			
			
			   });
	 _this.onLoad();		   
			  }
		
		  },
		
		 });
		
	},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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