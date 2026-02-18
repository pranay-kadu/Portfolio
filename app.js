function getData(dataId, getNextData) {
  setTimeout(() => {
    console.log("data", dataId);
    if (getNextData) {
      getNextData();
    }
  }, 2000);
}

getData(1, () => {
    console.log("getting data2..........");
  getData(2, () => {
    console.log("getting data2..........");
  getData(2, () => {
    getData(3, () => {
      getData(7, () => {
        getData(10);
      });
    });
  });
});
