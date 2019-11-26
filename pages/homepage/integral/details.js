// pages/homepage/integral/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isShowBackcolor:'#FFF',
      titleText: '兑换记录', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		 var _this = this;
		 var huanc = wx.getStorageSync('unionid');
		 var unionid=huanc.unionid;
		 //接收跳转学员id
		 var student_id = options.student_id; 
	wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/Exchange_detail',
      data: {
			unionid:unionid,
			student_id:student_id
      },
		success: function (res) {
		var datalist=res.data.details;
		if(datalist){
		 var type=res.data.details;	
		}else{
			type=1;
		}
	  _this.setData({
			type:type,
		 })
			 
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