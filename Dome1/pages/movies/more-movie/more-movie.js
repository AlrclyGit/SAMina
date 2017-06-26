// pages/movies/more-movie/more-movie.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: "",
    navigateTitle: "",
    requestUrl : "",
    totalCount : 0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.data.navigateTitle = category;
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon";
        break;
      case "豆瓣TOP200":
        var dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    this.data.requestUrl = dataUrl;
    util.http(dataUrl, this.processDoubanData)
  },

  /**
   * 触底加载更多
   */
  onScrollLower:function(event){
    var nexUrl = this.data.requestUrl + 
    "?start=" + this.data.totalCount + "&count=20";
    util.http(nexUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh: function (event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  /**
   * 对接收的数据进行处理
   */
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '…';
      }
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        ztitile: moviesDouban.title
      }
      movies.push(temp)
    }
    //如果要绑定新加载的数据，那么需要同旧有的数据合并在一起
    var totalMovies = {}
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }
    else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
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