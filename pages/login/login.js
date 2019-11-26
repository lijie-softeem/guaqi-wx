// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
			var encryptedData = res.encryptedData;	
			var iv = res.iv;	
	wx.login({
        success: function (res) {
          var code = res.code;
          wx.request({
            url: 'https://api.guaqi.vip/index.php/Course/Open_Id',
            data: {
              encryptedData:encryptedData,
              iv:iv,
              code: code
            },
            success: function (res) {
             var unionid=res.data.msg;
			var number=res.data.number;
            if(res.data.code == 200){
			 wx.setStorage({
				  key: 'unionid',
				  data: {
					 unionid:unionid,
					 number:number,
				  },
				  
				})
			wx.showToast({
				icon: 'success',
				title: '登录成功',
				duration: 1000,
				success:function(data){
			    wx.switchTab({
					url: '../number/number',
					})	
					}
			  })
				
			}
			if(res.data.code == 400){
				var title=res.data.msg
			wx.showToast({
				icon: 'none',
				title: title,
				duration: 1500,
				success:function(){
					   wx.switchTab({
			url: '../login/login',
			})	
					 }
			  })
				
			} 
			if(res.data.code == 300){
				 wx.setStorage({
				  key: 'unionid',
				  data: {
					 unionid:unionid,
					 number:number,
				  },
				  
				})
				wx.showToast({
					icon: 'none',
					title: '登录成功',
					duration: 2000,
					success:function(){
						
					wx.switchTab({
					url: '../index/index',
					})
						 }
				  })
					
				} 			
			
            }
          })
        }

      }); 
				
     
			 
            }
          })
        }
		
      }
    })
	
  },
    bindGetUserInfo: function(e) {
     
    if (e.detail.userInfo){
      //用户按了允许授权按钮
	  app.globalData.userInfo=e.detail.userInfo;
	this.setData({
		userInfo:e.detail.userInfo,
		hasUserInfo:true
	})
      wx.login({

        success: function (res) {
          var code = res.code;
          wx.request({
            url: 'https://api.guaqi.vip/index.php/Course/Open_Id',
            data: {
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              code: code
            },
            success: function (res) {
             var unionid=res.data.msg;
			var number=res.data.number;
            if(res.data.code == 200){
			 wx.setStorage({
				  key: 'unionid',
				  data: {
					 unionid:unionid,
					 number:number,
				  },
				  
				})
			wx.showToast({
				icon: 'success',
				title: '登录成功',
				duration: 1000,
				success:function(data){
			    wx.switchTab({
					url: '../number/number',
					})	
					}
			  })
				
			}
			if(res.data.code == 400){
				var title=res.data.msg
			wx.showToast({
				icon: 'none',
				title: title,
				duration: 1500,
				success:function(){
					   wx.switchTab({
			url: '../login/login',
			})	
					 }
			  })
				
			} 
			if(res.data.code == 300){
				 wx.setStorage({
				  key: 'unionid',
				  data: {
					 unionid:unionid,
					 number:number,
				  },
				  
				})
				wx.showToast({
					icon: 'none',
					title: '登录成功',
					duration: 2000,
					success:function(){
						
					wx.switchTab({
					url: '../index/index',
					})
						 }
				  })
					
				} 			
			
            }
          })
        }

      }); 
	  
			
    } else {
      //用户按了拒绝按钮
		wx.showModal({
          title: '提示',
          content: '若不授权微信登录，则无法使用小程序。点击"返回"按钮 并允许授权登录方可正常使用。',
          showCancel:false,
          confirmText:'返回',
		
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