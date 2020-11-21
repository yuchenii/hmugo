let ajaxtimes = 0;
export const request = (params) => {
    ajaxtimes++;
    //显示加载中的效果
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    //定义公共url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {

        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxtimes--;
                if (ajaxtimes === 0) {
                    //关闭加载中的图标
                    wx.hideLoading();
                }

            }
        });
    })
}