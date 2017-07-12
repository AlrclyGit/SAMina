// post-deatil.js

var postsData = require('../../../data/posts-data.js')
var app = getApp();

Page({

  /**
   * --页面的初始数据
   */
  data: {
    isPlayingMusic: false
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

    if (app.globalData.g_isPalyingMusic && app.globalData.g_currentMusicPolstId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }

    this.setMusicMonitor();

  },


  /**
   * --监听音乐播放
   */
  setMusicMonitor: function () {

    var that = this;

    //监听音乐播放。
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPalyingMusic = true
      app.globalData.g_currentMusicPolstId = that.data.currentPostId
    });

    //监听音乐暂停。
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPalyingMusic = false
      app.globalData.g_currentMusicPolstId = null;
    });

    //监听音乐停止。
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPalyingMusic = false
      app.globalData.g_currentMusicPolstId = null;
    });

  },

  /**
   * --监听收藏点击
   */
  onColletionTap: function (event) {
    //this.getPostCollectedSyc)();
    this.getPostCollectedAsy();
  },

  getPostCollectedAsy: function () {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function (res) {
        var postsCollected = res.data;
        var postcolledted = postsCollected[that.data.currentPostId];
        postcolledted = !postcolledted;
        postsCollected[that.data.currentPostId] = postcolledted;
        that.showTosat(postsCollected, postcolledted);
      }
    })
  },

  getPostCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postcolledted = postsCollected[this.data.currentPostId];
    postcolledted = !postcolledted;
    postsCollected[this.data.currentPostId] = postcolledted;
    this.showTosat(postsCollected, postcolledted);
  },


  /**
   * --Model弹窗
   */
  showModel: function (postsCollected, postcolledted) {
    var that = this;
    //显示弹窗
    wx.showModal({
      title: '收藏',
      content: postcolledted ? '确认收藏该文章吗？' : '确认取消收藏该文章吗？',
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
  onShareTap: function () {
    var itmList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ];
    wx.showActionSheet({
      itemList: itmList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是否点击了取消按钮
        //res.tapIndex 数组元素的下标，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消' + res.cancel + "现在无法实现分享功能。"
        })
      }
    })
  },


  /**
   * --监听音乐点击
   */
  onMusicTap: function (event) {
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();

    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })

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