// pages/works/works.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isShowBackcolor:'#FFF',
      titleText: '优秀作品', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
  },
	play(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo', this);
       videoContext.requestFullScreen();
      
    },
	 
	 play2(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo2', this);
       videoContext.requestFullScreen();
      
    },
	play3(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo3', this);
       videoContext.requestFullScreen();
      
    },
	play4(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo4', this);
       videoContext.requestFullScreen();
      
    },
	play5(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo5', this);
       videoContext.requestFullScreen();
      
    },
	play6(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo6', this);
       videoContext.requestFullScreen();
      
    },
	play7(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo7', this);
       videoContext.requestFullScreen();
      
    },
	play8(e) {
       //执行全屏方法  
       var videoContext = wx.createVideoContext('myvideo8', this);
       videoContext.requestFullScreen();
      
    },
	


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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