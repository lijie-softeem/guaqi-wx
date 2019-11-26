// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
	isShowBackcolor:'#fff',
      titleText: '在线预约', // 导航栏 中间的标题
	  backIcon:'1',//返回按钮
	array2: ['男', '女'],
	primarySize: 'default',
  },
  /*  传课程id值 */
   bindPickerChange: function(e) {
		let _this = this;
		let kecalss=_this.data.course_names[e.detail.value];
	
    this.setData({
      index: e.detail.value,
	  kecalss:kecalss.id
    })
  },
/*  获取校区 */
  bindPickerChange1: function(e) {
		let _this = this;
		let school=_this.data.store_names[e.detail.value] 
		
    this.setData({
      index1: e.detail.value,
	  school:school.id
    })
  },
 //获取性别
   bindPickerChange2: function(e) {
    let _this = this;
		let sex=_this.data.array2[e.detail.value];
    this.setData({
      index2: e.detail.value,
	  sex:sex
    })
  },
  //提交预约信息
  formSubmit: function (e) {

	let _this = this;
	let username=e.detail.value.username;
	let age= e.detail.value.age;
	let sex= _this.data.sex;
	let number=e.detail.value.number;
	let kecalss=_this.data.kecalss;
	let school=_this.data.school;
	if ( username == "") {
      wx.showToast({
		icon: 'none',
        title: '请输入正确的姓名格式',
        duration: 2000
      })
	}else if(school == undefined || school == ""  ) {
      wx.showToast({
		 icon: 'none',
        title: '请输入正确的校区格式',
        duration: 2000
      })
	}else if(kecalss == undefined || kecalss == "" ) {
      wx.showToast({
		 icon: 'none',
        title: '请输入正确的课程格式',
        duration: 2000
      })
	}else if(age == "" ) {
      wx.showToast({
		 icon: 'none',
        title: '请输入正确的年龄格式',
        duration: 2000
      })
	}else if(number == "" || !(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/.test(number) )) {
      wx.showToast({
		icon: 'none',
        title: '请输入正确的手机号格式',
        duration: 2000
      })
	} else{
	 wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/online_booking', //本地服务器地址
      data: {
		kecalss:kecalss,
		school:school,
		number:number,
		age:age,
		sex:sex,
		username:username
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
		success: function (res) {
		     wx.showToast({
				 title: '预约成功',
				 icon: 'success',
				 duration: 2000,//持续的时间
				 success:function(data){
				setTimeout(function () {
              //要延时执行的代码
              wx.redirectTo({
				  
                url: '/pages/appointment/appointment'
              })
            }, 1000)
				 }
				
			   });
			 
      },
      fail: function (res) {
        wx.showToast({
				 title: '预约失败',
				 icon: 'none',
				 duration: 2000//持续的时间
			   });
			    _this.onLoad();
				
		}
	 
    })
	}

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  
	
  let _this = this;
    wx.request({
      url: 'https://api.guaqi.vip/index.php/Course/courseData',
      data: {
		 
	  },
	  //回调数据
      success:function(res){
		  //获取所有课程 、分店
			var datas=res.data.datli;
			var datalist=res.data.msgss;
		_this.setData({
			course_names:datas,
			store_names:datalist
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})