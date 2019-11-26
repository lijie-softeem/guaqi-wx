//app.js
App({
  onLaunch: function () {
	  var _this = this;
 
		wx.getSystemInfo({ // 获取设备信息
		  success: (res) => {
		   this.globalData.systeminfo = res
		  },
		  })
		  // 获得胶囊按钮位置信息
		  this.globalData.headerBtnPosi = wx.getMenuButtonBoundingClientRect();
		
	  // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
			  _this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.globalData.platform = res.platform
        let totalTopHeight = 68
        if (res.model.indexOf('iPhone X') !== -1) {
          totalTopHeight = 88
        } else if (res.model.indexOf('iPhone') !== -1) {
          totalTopHeight = 64
        }
        _this.globalData.statusBarHeight = res.statusBarHeight
        _this.globalData.titleBarHeight = totalTopHeight - res.statusBarHeight
      },
      failure() {
        _this.globalData.statusBarHeight = 0
        _this.globalData.titleBarHeight = 0
      }
    })
  },
  onPullDownRefresh(){
　　console.log('--------下拉刷新-------')
　　wx.stopPullDownRefresh() //停止下拉刷新
      this.getList(); //加载数据列表的函数——建议单独提出来写
},
  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。
   
    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
	  tabBar:tabBar
    });
  }, 
 globalData: {
  systeminfo: {}, // 系统信息
  headerBtnPosi: {}, // 胶囊按钮位置信息
  
 },


})