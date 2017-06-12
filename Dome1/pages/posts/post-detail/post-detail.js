// post-deatil.js

var postsData = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    });

    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    }
    else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected);
    }
  },

  /**
   * --监听收藏点击
   */
  onColletionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postcolledted = postsCollected[this.data.currentPostId];
    postcolledted = !postcolledted;
    postsCollected[this.data.currentPostId] = postcolledted;
    this.showTosat(postsCollected, postcolledted);
  },


  /**
   * --Model弹窗
   */
  showModel: function (postsCollected, postcolledted ) {
    var that = this;
    //显示弹窗
    wx.showModal({
      title: '收藏',
      content: postcolledted ? '确认收藏该文章吗？' : '确认取消收藏该文章吗？' ,
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: "确认",
      confirmColor: '#405f80',
      success: function (res) {
        if (res.confirm) {
          //更新缓存
          wx.setStorageSync("posts_collected", postsCollected);
          //更新数据绑定
          that.setData({
            collected: postcolledted
          })
        }
      }
    })
  },


  /**
   * --Tosat弹窗
   */
  showTosat: function (postsCollected, postcolledted) {
    var that = this;
    //更新缓存
    wx.setStorageSync("posts_collected", postsCollected);
    //更新数据绑定
    that.setData({
      collected: postcolledted
    })
    //显示弹窗
    wx.showToast({
      title: postcolledted ? '收藏成功' : "取消成功",
      duration: 1500,
      icon: "success"
    })
  },


  /**
   * --ShareTap弹窗
   */
  onShareTap:function(){
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博"
      ],
      itemColor:"#405f80",
      success:function(res){
        //res.cancel 用户是否点击了取消按钮
        //res.tapIndex 数组元素的下标，从0开始
      }
    })
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