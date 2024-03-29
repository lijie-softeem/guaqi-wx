const app = getApp();
Component({   
   properties: {        
   isShowBackcolor: {            
        type: String,            
        value: 'red'        
    },        
    color: {            
        type: String,            
        value: 'rgba(0, 0, 0, 1)'        
    },        
    titleText: {            
        type: String,            
        value: '导航栏'        
    },
   titleClass: {
        type: String,
        value: '导航栏'
    },
    titleImg: {            
        type: String,            
        value: ''        
    },        
    backIcon: {            
        type: String,            
        value: ''        
     },        
    homeIcon: {            
        type: String,            
        value: ''        
    },        
    fontSize: {            
        type: Number,            
        value: 16        
    },        
    iconHeight: {            
        type: Number,            
        value: 19       
    },        
    iconWidth: {            
        type:Number,            
        value: 58        
    }    
   },    
attached: function(){        
    var that = this;        
    that.setNavSize();        
    that.setStyle();    
   },    
 data: {
    },    
methods: {        
// 通过获取系统信息计算导航栏高度        
setNavSize: function() {            
var that = this                
    , sysinfo = wx.getSystemInfoSync()                
    , statusHeight = sysinfo.statusBarHeight                
    , isiOS = sysinfo.system.indexOf('iOS') > -1                
    , navHeight;            
if (!isiOS) {                
    navHeight = 48;            
   } else {                
    navHeight = 44;            
}            
that.setData({                
    status: statusHeight,                
    navHeight: navHeight            
  })        
},        
setStyle: function() {
    var that  = this
    , containerStyle                
    , textStyle                
    , iconStyle;
    var fontSize = that.data.fontSize*2-4;
    containerStyle = [                
        'background:' + that.data.background                
        ].join(';');            
        textStyle = [                
        'color:' + that.data.color,                
        'font-size:' + fontSize + 'rpx'
        ].join(';');            
        iconStyle = [                
        'width: ' + that.data.iconWidth + 'rpx',
        'height: ' + that.data.iconHeight + 'rpx'
        ].join(';');            
        that.setData({               
             containerStyle: containerStyle,                
             textStyle: textStyle,                
             iconStyle: iconStyle            
        })        },        
        // 返回事件        
back: function(){            
    wx.navigateBack({                
        delta: 1            
    })            
    this.triggerEvent('back', {back: 1})        
},        
home: function() {            
    this.triggerEvent('home', {});       
 }   
 }})