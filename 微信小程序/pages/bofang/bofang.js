Page({
  data: {
    isPlaying: false
  },

  onPrevTap() {
    console.log('Previous button tapped');
    // 这里添加前一首歌曲的逻辑
  },

  onPlayPauseTap() {
    this.setData({
      isPlaying: !this.data.isPlaying
    });
    console.log(this.data.isPlaying ? 'Playing' : 'Paused');
    // 这里添加播放或暂停的逻辑
  },

  onNextTap() {
    console.log('Next button tapped');
    // 这里添加下一首歌曲的逻辑
  }
});
