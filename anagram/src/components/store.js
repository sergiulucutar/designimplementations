const store = {
  state: {
    images: []
  },
  addImage(img) {
    this.state.images.push(img);
  }
};
export default store;
