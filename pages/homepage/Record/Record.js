// pages/homepage/Record/Record.js

var time = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
   isShowBackcolor:'#FFF',
      titleText: '消课记录', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
    showView:'',
	sser:1,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        var _this = this;
		var student_id = options.student_id;
		wx.request({
		  url: 'https://api.guaqi.vip/index.php/Course/Sign',
		  data: {
			student_id:student_id
		  },
		  //回调数据
		  success:function(res){
         var student_data=res.data.msg;
		    var created_time=[];
			var one_1=[];
		 	for(var i=0;i<student_data.length;i++){
				 created_time[i] = student_data[i].created_time;
				 student_data[i]['created_time']=time.formatTime(created_time[i],'Y.M.D');
				 student_data[i]['week']=time.getDates(1);
				 if(student_data[i].classroom_performance){
					student_data[i]['classroom_performance']=student_data[i].classroom_performance.split(",");		
				for(var j=0;j<student_data[i]['classroom_performance'].length;j++){	
                        student_data[i]['classroom_performance'][j] = parseInt(student_data[i]['classroom_performance'][j]);    				
				
				}			
				 }else{
					 student_data[i]['classroom_performance'] = student_data[i].classroom_performance;  
				 }
			}
			_this.setData({
				student_data:student_data,
			});
		  }
		 });
  },
	//点击关闭
	xiashang:function (e) {
		
		var _this = this;
		var sser = e.currentTarget.dataset.sser;
		var showView =e.currentTarget.dataset.id;
		 	if(sser == 2){
					_this.setData({
					  sser:sser,
					  showView:showView,
					  
					});
					}else{
					_this.setData({
					   sser:sser,
					   showView: showView,
					});
					}	
	},
	 //点击展开
	shangxia:function (e) {
		
		var _this = this;
		var sser = e.currentTarget.dataset.sser;
		var showView =e.currentTarget.dataset.id;
		 if(sser == 1){
					_this.setData({
					  sser:sser,
					  showView:showView,
					  
					});
					}else{
					_this.setData({
					   sser:sser,
					   showView: showView,
					});
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