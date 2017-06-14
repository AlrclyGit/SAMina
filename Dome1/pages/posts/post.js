// post.js

var postsData = require('../../data/posts-data.js')

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

    this.setData({
      posts_key: postsData.postList
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 列表跳转详情
   */
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url:'post-detail/post-detail?id=' + postId
    })
  },

/**
 * Barten跳转详情
 */
onSwiperItemTap:function(event){
  var postId = event.currentTarget.dataset.postid;
  wx.navigateTo({
    url:'post-detail/post-detail?id=' + postId
  })
},

/**
 * Barten跳转详情（整体）
 */
onSwiperTap:function(event){
  //target指的是当前点击的组件 而 currentTarget指的是事件捕获的组件
  var postId = event.target.dataset.dataset.postid;
  wx.navigateTo({
    url: 'post-detail/post-detail?id=' + postId
  })
}


})