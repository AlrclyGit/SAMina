// post.js
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

    var post_content = [
      {
        data: "Sep 18 2016",
        title: "埃罗芒阿老师",
        post_img: "/images/xjj.png",
        author_img: "/images/gkls.jpg",
        img_condition: true,
        content: "《情色漫画老师》是日本轻小说作家伏见司继《我的妹妹哪有这么可爱！》完结之后的轻小说新作，插画同样由负责《我的妹妹哪有这么可爱！》插画的神崎广绘制。",
        view_num: "112",
        collect_num: "96",
      },
      {
        data: "Nov 25 2016",
        title: "正确的KADO",
        post_img: "/images/xjj.png",
        author_img: "/images/kado.jpg",
        img_condition: true,
        content: "《正解的卡多》是由东映动画原作并负责制作，村田和也指导，野崎窗系列构成并脚本的原创CG电视动画。",
        view_num: "152",
        collect_num: "56",
      }
    ] 

    this.setData({post_key:post_content});



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