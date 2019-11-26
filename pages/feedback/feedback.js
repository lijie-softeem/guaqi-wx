// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isShowBackcolor:'#FFF',
      titleText: '用户反馈', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
  },

  /**
   * 生命周期函数--监听页面加载  听页面加载听页面加载听页面加载听页面加载
   */
  onLoad: function (options) {

  },
  //提交反馈
    formSubmit: function (e) {
	let _this = this;
	let content=e.detail.value.texts;
	var len = parseInt(content.length);
	if (len > 201 ) {
      wx.showToast({
		icon: 'none',
        title: '您已超过200字',
        duration: 2000
      })
	}else if(len == "" ) {
      wx.showToast({
		icon: 'none',
        title: '数据不能为空',
        duration: 2000
      })
	} else{
	 wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/parent_notice', //本地服务器地址
      data: {
		
		content:content
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
		success: function (res) {
		     wx.showToast({
				 title: '提交成功',
				 icon: 'success',
				 duration: 2000,//持续的时间
				 success:function(data){
				setTimeout(function () {
              //要延时执行的代码
              wx.switchTab({
				  
                url: '/pages/onal/onal'
              })
            }, 1000)
				 }
				
			   });
			 
      },
      fail: function (res) {
        wx.showToast({
				 title: '未知错误',
				 icon: 'fail',
				 duration: 2000//持续的时间
			   });
			    _this.onLoad();
		}
	 
    })
	}

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