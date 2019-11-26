
Page({

 /**
* 页面的初始数据
*/
data:{
	/* code:'132', */
	good:false,
	file:true,
    isShowBackcolor:'#FFF',
      titleText: '报名课程', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
    inputValue: '', //搜索的内容

	isShowBackcolor:'#FA9956',
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let _this = this;
		//接收学员id
		var student_id = options.student_id;
		var huanc = wx.getStorageSync('unionid');
		var unionid=huanc.unionid;
    wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/Course_Enrolment',
      data: {
		unionid:unionid,
		student_id:student_id
	  },
	  //回调数据
      success:function(res){
		_this.setData({
			course:res.data.msg,
			file:true,
			good:false,
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