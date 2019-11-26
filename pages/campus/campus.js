// pages/campus/campus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      swiper: {
          isShowBackcolor: '#fff',
          titleText: '校区展示', // 导航栏 中间的标题
          backIcon: '1',//返回按钮
          autoplay: true,
          interval: 5000,
          duration: 1000,
          "bnrUrl": [
              {
                  "isShowBackcolor":'#FA9956',
                  "url": "https://api.guaqi.vip/home/Common/images/nan-1.png",
                  "name":"一店",
                  "content":"南湖校区",
                  "add":"武汉市洪山区丁字桥南路武昌府南湖佰港城/体验城写字楼八楼",
                  "longitude":"114.33222",
                  "latitude":"30.509877",
                  "ipone":"027-59765625",
                  "addmap":"getLocation",
                  markers: [
                      {
                          id: 0,
                          latitude: 30.509877,
                          longitude: 114.33222,


                      }],


              },
              {
                  "url":"https://api.guaqi.vip/home/Common/images/nan-2.png",
                  "name":"二店",
                  "content":"中北校区",
                  "add":"武汉市武昌区中北路116号青鱼嘴家盛时代广场三楼（青鱼嘴地铁口B出口）",
                  "longitude":"114.356563",
                  "latitude":"30.569498",
                  "ipone":"027-59765625",
                  "addmap":"getLocation1",
                  markers: [
                      {
                          id: 0,
                          latitude: 30.569498,
                          longitude: 114.356563,


                      }],
              },
              {
                  "url":"https://api.guaqi.vip/home/Common/images/nan-3.png",
                  "name":"三店",
                  "content":"凯德校区",
                  "add":"武汉市硚口区解放大道32号硚口凯德西广场二楼（古田二路轻轨站A出口）",
                  "longitude":"114.199849",
                  "latitude":"30.603356",
                  "ipone":"027-59765625",
                  "addmap":"getLocation2",
                  markers: [
                      {
                          id: 0,
                          latitude: 30.603356,
                          longitude: 114.199849,


                      }],
              },
              {
                  "url":"https://api.guaqi.vip/home/Common/images/nan-3.png",
                  "name":"四店",
                  "content":"龙城校区",
                  "add":"武汉市洪山区天际路19号与龙城路路口南湖中百仓储龙城店旁",
                  "longitude":"114.384086",
                  "latitude":"30.470199",
                  "ipone":"027-59765625",
                  "addmap":"getLocation3",
                  markers: [
                      {
                          id: 0,
                          latitude: 30.470199,
                          longitude: 114.384086,


                      }],
              }
          ],
          indicatorDots: true,
          current:0,
      }

  },
  getLocation:function(){
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.509877,//要去的纬度-地址
          longitude: 114.326035,//要去的经度-地址
          name: "武汉市洪山区丁字桥南路武昌府南湖佰港城/体验城写字楼八楼",
        /*   address: '华侨城商业中心' */
        })
      }
    })
  },
 
  getLocation1:function(){
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.569498,//要去的纬度-地址
          longitude: 114.350153,//要去的经度-地址
          name: "武汉市武昌区中北路116号青鱼嘴家盛时代广场三楼（青鱼嘴地铁口B出口）",
        /*   address: '华侨城商业中心' */
        })
      }
    })
  },

  getLocation2:function(){
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 30.603356,//要去的纬度-地址
          longitude: 114.192963,//要去的经度-地址
          name: "武汉市硚口区解放大道32号硚口凯德西广场二楼（古田二路轻轨站A出口）",
        /*   address: '华侨城商业中心' */
        })
      }
    })
  },

  getLocation3:function(){
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude:30.470199,//要去的纬度-地址
          longitude: 114.377805,//要去的经度-地址
          name: "武汉市洪山区天际路19号与龙城路路口南湖中百仓储龙城店旁",
        /*   address: '华侨城商业中心' */
        })
      }
    })
  },

   regionchange(e) {
  },
  markertap(e) {
  },
  controltap(e) {
  },

    prevImg:function(){

        var swiper =this.data.swiper;

        var current = swiper.current;
        swiper.current= current>0? current-1: swiper.bnrUrl.length-1;

        this.setData({

            swiper: swiper,

        })

    },

    nextImg:function() {

        var swiper =this.data.swiper;

        var current = swiper.current;

        swiper.current= current < (swiper.bnrUrl.length-1) ? current +1:0;
      // console.log(swiper);
        this.setData({

            swiper: swiper,

        })

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