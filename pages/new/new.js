// pages/new/new.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  isShowBackcolor:'#FA9956',
      titleText: '新闻详情', // 导航栏 中间的标题
	   backIcon:'1',//返回按钮
	code:'whrd',
	datas:'',
  },
  
   

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	/**
	   * 获取跳转ID
	   */
		var id = options.id
		this.setData({
		  id: id
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tap() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     this.getNew();
  },
   getNew: function() {
		let _this = this;
		let id = _this.data.id;
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/News/detail_news',
		  data: {id:id},
		  
		  //回调数据
		  success:function(res){
			
			_this.setData({
			  datas: res.data.msg,
			})
		  }

		});
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