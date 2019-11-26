// pages/own/order/order.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	 isShowBackcolor:'#FA9956',
      titleText: '全部课程', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
	currtab: 0,
    swipertab: [{ name: '待预约', index: 0 }, { name: '已报名', index: 1 }, { name: '已取消', index: 2 }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 var _this = this
	 	var huanc = wx.getStorageSync('unionid');
		var unionid=huanc.unionid;
		var number = huanc.number;
		var collection = _this.data.collection;
		
		var appointment=6;
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/collection',
		  data: {
			unionid:unionid,
			number:number,
			appointment:appointment
		  },
		  //回调数据
		  success:function(res){
			  var data = res.data.msg;
			  var type = res.data.type;
			  var no_course = res.data.no_course;
			  var sign_up = res.data.sign_up;
		
			_this.setData({
				    course:data,
					type:type,
					no_course:no_course,
					sign_up:sign_up,
				
			     });
			   
		  }
		
		 });

   

  },
  
  //待预约跳转
 detali_yy:function(e) {
	
	 var id = e.currentTarget.dataset.id;
      wx.navigateTo({
		
        url: '../../curriculum/details?id='+ id,
      })
  },
    //已取消跳转
 detali_qx:function(e) {
	 var id = e.currentTarget.dataset.id;
	
      wx.navigateTo({
		 
        url: '../../curriculum/details?id='+ id,
      })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
   getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
	
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
    }
  },
  alreadyShow: function(){
    this.setData({
      alreadyOrder: [{ name: "1大颗粒(1年)(普通班)  小颗粒+wedo(1年)(普通班)  ", state: "交易成功", time: "2018/08/30-2018/09/30", status: "已完成", url: "img/课程.png", money: "3000" }], 
    })
  },
 
  waitPayShow:function(){
    this.setData({
      waitPayOrder: [{ name: "2大颗粒(1年)(普通班)  小颗粒+wedo(1年)(普通班) ", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "img/课程2.png", money: "3000" }],
    })
  },
 
  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "3大颗粒(1年)(普通班)小颗粒1年)(普通班)", state: "已取消", time: "2018-10-4 10:00-12:00", status: "未开始", url: "img/课程3.png", money: "3000" }],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  
    if (app.globalData.currentLocation == '') {
      this.setData({
        currtab: 0
      });
    } else {
      var i = app.globalData.currentLocation;
      this.setData({
        currtab: i
      });
    }

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