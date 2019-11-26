// pages/onal/onal.js
var app = getApp();
var interval = new Object();
Page({

  /**
   * 页面的初始数据
   */
  data: {
 	  isShowBackcolor:'#FF9B2C',
      titleText: '我的', // 导航栏 中间的标题
	  backIcon:'',//返回按钮
	  countDownSecond: 60,
	  dataw:true,
	  flag:true,
	  fals:true,
	  second: 60, // 60秒倒计时时间
	  send: true, // 未发送前
	  userInfo:{
      avatarUrl:"",
      nickName:"",
	  },
      list:[], 
	   inputValue: '', //搜索的内容
  },

    //搜索框文本内容显示
    inputBind: function(event) {
        this.setData({
            inputValue: event.detail.value
        })
    },
	   //搜索框文本内容显示
    codevalue: function(event) {
        this.setData({
            codevalue: event.detail.value
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	   var _this=this;
	   var huanc = wx.getStorageSync('unionid');
	   var unionid=huanc.unionid;
	   wx.request({
		url: 'https://api.guaqi.vip/index.php/Course/Bound_Cadets',
		data: {
			unionid:unionid
		},
		method: 'GET',
		success: function(res) {
			var student_id = res.data.msgw;
			 _this.setData({
			student_id:student_id,
			});
			}
		});
    /**
     * 获取用户信息	
     */
    wx.getUserInfo({
      success:function(res){
      
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        _this.setData({
		  unionid:unionid, 
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]:res.userInfo.nickName,
        });
      }
	});

  },

  
    //搜索
   query:function(e) {
		 var _this=this;
		 var inputValue =_this.data.inputValue;
		 var huanc = wx.getStorageSync('unionid');
		 var unionid=huanc.unionid;
		if(inputValue == ''){
			 wx.showToast({
			icon: 'none',
			title: '请输入搜索词',
			duration: 1000,
			success:function(){
				 }
		  })
		}
		wx.request({
		url: 'https://api.guaqi.vip/index.php/Course/Bound_Cadets',
		data: {
			inputValue: _this.data.inputValue,
			unionid:unionid
		},
		method: 'GET',
		success: function(res) {
			var searchData = res.data.msg;
			if(res.data.code == 400 ){
			 wx.showToast({
				icon: 'none',
				title: '暂无人员信息',
				duration: 1000,
			  })
			  _this.setData({
				dataw:true,
				fals:true,
				send: true,
			});
			}else{
			 _this.setData({
				searchData:searchData,
				fals:true,
				dataw:false,
				send: true,
			});
			}
		_this.startTimer(60);
			}
		});
	  },
/* 绑定学员 */
	binding: function (e) {
	var _this=this;
    var numbers = e.currentTarget.dataset.number;
	if(numbers){
		
	 wx.request({
		url: 'https://api.guaqi.vip/index.php/Course/Bound_code',
		data: {
			numbers:numbers,
		},
		 
		method: 'GET',
		success: function(res) {

			var searchData = res.data.msg;
			var number = res.data.number;
			var code_s = res.data.code_s;
		wx.showToast({
			icon: 'none',
			title:res.data.msg,
			duration: 1000,
		  })  
		 
	_this.setData({
		 alreadySend: true,
		 fals:false,
		 send:false, 
		 numbers:numbers,
		 code_s:code_s,
		 number:number
		});
		_this.timer();
			
			}
		});
		
	}


  },

  //倒计时
  timer: function () {

	this.startTimer(59);
  },

  startTimer: function(currentstartTimer) {
 
    //注意点3: 清除定时器 为了保证每次只有一个定时器，和下拉刷新 配合，否则会导致 计时数据跳动，因为创建了多个定时器。
    clearInterval(interval);
    interval = setInterval(function() {
      // 秒数
      var second = currentstartTimer;
      // 天数位
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;
  
      // 小时位
       var hr = Math.floor((second - day * 3600 * 24) / 3600);
     var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;
  
      // 分钟位
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr; 
 
      // 秒位
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;
      if(secStr == 0){
		  secStr=60;
		  clearInterval(interval); 
	  }
       this.setData({
        countDownSecond: secStr,
		
		
      }); 
      currentstartTimer--;
      if (currentstartTimer <= 0) {
        clearInterval(interval);
        this.setData({
          countDownSecond: '60',
		  send: true,
        });
      }
    }.bind(this), 1000);
  },


  /* 验证码绑定学员 */
  Code: function () {
	
	var _this=this;
    var numbers = _this.data.numbers;
	var codevalue = _this.data.codevalue;
	var number =_this.data.number;
	var code_s =_this.data.code_s;
	var huanc = wx.getStorageSync('unionid');
	var unionid=huanc.unionid;
	_this.setData({
		 fals:false
		});
	
 	wx.request({
		url: 'https://api.guaqi.vip/index.php/Course/Verification',
		data: {
			code_s:code_s,
			number:number,
			numbers:numbers,
			codevalue:codevalue,
			unionid:unionid
		},
		method: 'GET',
		success: function(res) {
			var searchData = res.data.msg;
			
			if(res.data.code == 200 ){
			 wx.showToast({
				icon: 'success',
				title: res.data.msg,
				duration: 1000,
			  })
			  _this.setData({
				 numbers:numbers,
				 flag:true,
			});
				_this.onLoad();
				
			}else{
				wx.showToast({
				icon: 'none',
				title: res.data.msg,
				duration: 1000,
			  })

			}
			_this.setData({
				 numbers:numbers,
				 fals:false,
			});
			}
		}); 
  },
//全部收藏信息
  orderall:function(e) {
	  app.globalData.currentLocation = 0,
      wx.navigateTo({
		 
        url: '../onal/order/order',
      })
  },
  //待预约
  noPay:function(){
    app.globalData.currentLocation  = 0,
	
    wx.navigateTo({ url: 'order/order' })  
  },
  //已报名
  noSend:function(){
		
    app.globalData.currentLocation  = 1,
    wx.navigateTo({ url: 'order/order' }) 
  },
    //已取消
  sended:function(){
    app.globalData.currentLocation  = 2,
    wx.navigateTo({ url: 'order/order' }) 
  },
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
      //跳转家长中心携带手机号码
  feedbacks:function(e) {
	  
      wx.navigateTo({
		 
        url: '../homepage/homepage',
      })
  },

     /*  跳转用户反馈 */
  feedback:function(e) {
      wx.navigateTo({
		 
        url: '../feedback/feedback',
      })
  },
   /**
   * 弹出层函数
   */
  //出现
  show: function () {
    this.setData({ 
		flag: false 
	})
	
   this.yinc();
  },
  //消失
 
  hide: function (res) {
	
	var inputValue='';
    this.setData({ 
		inputValue:inputValue,
		flag: true,
		fals: true,	
		dataw:true,	
	}) 
	 this.xianshi();
	

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	

  },
  xianshi:function () {
	wx.showTabBar({})
  },
  yinc:function () {
	  wx.hideTabBar({
		  
	  })
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