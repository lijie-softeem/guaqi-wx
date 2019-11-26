// pages/homepage/classcard.js
var util = require('../../../utils/util.js');
var time = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isShowBackcolor:'#4D37B2',
      titleText: ' ', // 导航栏 中间的标题
      titleClass: 'icon_white ', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
	fales:false,
	fale:true,
	oIndex: 0,
    left: 0,
	
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // 获取上课时间
	var _this = this;
	/**
   * 获取跳转ID
   */
	var student_id = options.student_id;
	var huanc = wx.getStorageSync('unionid');
	var unionid=huanc.unionid;
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/Class_Card',
		  data: {
			unionid:unionid,
			student_id:student_id,
			
		  },
		  //回调数据
		  success:function(res){
			   var datalist=res.data.msg;
			   if(res.data.code == 200){
			   var week_time=[];
			   var nowDate=util.formatTimes(new Date()); 
			   _this.setData({
				datalist:datalist,
				stu_img:res.data.stu_img,
				nowDate:nowDate ,
			});
			   }else{
			_this.setData({
				datalist:1,
			}); 
			   }
			   
			
		  }
		 });
	
  },
  //展开更多老师
	hei_pa:function () {
	var _this = this;
	_this.setData({
		fales:true,
		fale:false
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
//接收返回页面的参数  
/* switchTab: function (e) {
    var oIndex= e.currentTarget.dataset.index;
    var oLeft = e.currentTarget.offsetLeft;
    if(oLeft == 327) {
        this.setData({
            left: 327,
        })
    } else if(oLeft == 0) {
        this.setData({
            left: 0,
        })
    }
    this.setData({
        oIndex: oIndex
    })
}, */

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