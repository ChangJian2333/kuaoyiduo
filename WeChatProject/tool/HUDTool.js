function showLoading(title) {
  wx.showToast({
    title: title,
    icon: 'loading'
  });
}
function cancelLoading() {
  wx.hideToast();
}

module.exports = {
  showLoading: showLoading,
  cancelLoading: cancelLoading
}