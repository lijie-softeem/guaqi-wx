// pages/onal/onal.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
	   isShowBackcolor:'#FF892C',
      titleText: '家长中心', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
	  dian:'Silver',
	  flag:1,
	  userInfo:{
      avatarUrl:"",
      nickName:"",
	  }

  },
  //切换学员 
  studentss: function () {
	var _this=this;
	var huanc = wx.getStorageSync('unionid');
	var unionid=huanc.unionid;
	var code = 1;
	wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/Student_List', 
      data: {
			unionid:unionid,
			code:code,
      },
		success: function (res) {
		var wells=res.data.msg;
		var aee=wells.length;
	  _this.setData({
		  wells:wells,
		    flag: 2,
			aee:aee,
		 })
			 
      },
   
    });
  },

/*  off: function (e) {
	  var _this=this;
	  var sttu = e.currentTarget.dataset.sttu;
	  _this.setData({
		  sttu:1,
		 })
  },  */
  //点击屏幕事件
  handleTouchStart: function (e) {
	  var _this=this;
	  var student_id = e.currentTarget.dataset.id;
	  _this.setData({
		  student_id:student_id,
		 dian:'Silver',
		 })
  },
  //离开屏幕点击事件
  handleTouchEnd: function (e) {
	  var _this=this;
	  var student_id = e.currentTarget.dataset.id;
	  _this.setData({
		 dian:'Silver',
		 student_id:student_id,
		 sttu:1,
		 })
  },
  //关闭切换
  hidd: function () {
	  var _this=this;
	  _this.setData({
		  flag: 1,
		 })
  },
  //获取绑定学员的id
  switchs:function(e){
	 var _this=this;
	 var student_id = e.currentTarget.dataset.id;
	 var type = e.currentTarget.dataset.type;
	
	 wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/Student_List', 
      data: {
		student_id:student_id,
      },
		success: function (res) {
		var datalist=res.data.msg;
		 wx.showToast({
		icon: 'success',
        title: "切换成功",
        duration: 1000,
		
      })
		 _this.setData({
			student_id:student_id, 
			flag:1,
			type:type,
		 })	 
		 _this.onLoad();	 
      },
   
    });
	 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	 var _this=this;
	 var huanc = wx.getStorageSync('unionid');
	 var unionid=huanc.unionid;
	 var student_id= _this.data.student_id;
	
	 //接收绑定学员的student_id 
	 if(student_id){
		 student_id= _this.data.student_id; 
	 }else{
		 //一开始是默认第一个学员的id
         student_id = 'type';
	 }
	wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/Student_List', 
      data: {
			unionid:unionid,
			student_id:student_id	
      },
		success: function (res) {
	
		var datalist=res.data.msg;
		//如果只有一个学员就隐藏切换按钮
		var sty=res.data.msgss;
		//回调学员id
		var student_id=res.data.student;
         _this.setData({
			sty:sty,
			datalist:datalist,
			student_id:student_id
		 })
	
      },
   
    });
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success:function(res){
      
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        _this.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]:res.userInfo.nickName,
        });
      }
	});
	
	
	
  },

/*   orderall:function(e) {
	  app.globalData.currentLocation = 0,
      wx.navigateTo({
		 
        url: '../onal/order/order',
      })
  },
	noPay:function(){
    app.globalData.currentLocation  = 0,
    wx.navigateTo({ url: 'order/order' })  
  },
	noSend:function(){
    app.globalData.currentLocation  = 1,
    wx.navigateTo({ url: 'order/order' }) 
  },
    
  sended:function(){
    app.globalData.currentLocation  = 2,
    wx.navigateTo({ url: 'order/order' }) 
  }, */
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 /*  跳转通知 */
  notice:function(e) {
      wx.navigateTo({
		 
        url: '../notice/notice',
      })
  },
   /*  跳转用户反馈 */
  feedback:function(e) {
      wx.navigateTo({
		 
        url: '../feedback/feedback',
      })
  },
    /*  跳转课程预约 */
  appointment:function(e) {
      wx.navigateTo({
		 
        url: '../appointment/appointment',
      })
  },
    /*  跳转课程表 */
  Classcard:function(e) {
	  var student_id = e.currentTarget.dataset.student_id;
      wx.navigateTo({
		 
        url: '../homepage/Classcard/Classcard?student_id='+student_id,
      })
  },
    /*  跳转推荐奖励 */
  Recommend:function(e) {
	  var student_id = e.currentTarget.dataset.student_id;
      wx.navigateTo({
		 
        url: '../homepage/Recommend/Recommend?student_id='+student_id,
      })
  },
      /*  跳转报名课程 */
  curriculum:function(e) {
	  var student_id = e.currentTarget.dataset.student_id;
      wx.navigateTo({
		 
        url: '../homepage/curriculum/curriculum?student_id='+student_id,
      })
  },
     /*  跳转打卡记录 */
  Record:function(e) {
	  var student_id = e.currentTarget.dataset.student_id;
      wx.navigateTo({
        url: '../homepage/Record/Record?student_id='+student_id,
      })
  },
       /*  跳转积分兑换 */
  integral:function(e) {
	  var student_id = e.currentTarget.dataset.student_id;
      wx.navigateTo({
		 
        url: '../homepage/integral/integral?student_id='+student_id,
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this.onLoad();
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

  },
})