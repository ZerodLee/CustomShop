const prefix = 'https://www.qntv3h.com/'
const url = {
    phoneInfo:'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
    getBanner:prefix + 'out/index.php/apphomepage/banners',
    getCategories: prefix + 'out/index.php/apphomepage/getimage',
    proLimitTime: prefix + 'out/index.php/apphomepage/recLimitTimeBuy',

    recHot: prefix + 'out/index.php/apphomepage/recHot',//同城馆
    newPro: prefix + 'out/index.php/apphomepage/newPro',//新品上架
    findPro: prefix + 'out/index.php/apphomepage/findPro',//发现好物
    getCarouselAdvertise: prefix + 'out/index.php/apphomepage/getCarouselAdvertise',//促销、同城、新品上架 这三项下 都会有一个广告图的插入
    getFindAdvertise: prefix + 'out/index.php/apphomepage/getFindAdvertise',//最下的三张图片
    hotHouse: prefix + 'out/index.php/apphomepage/hotHouse',//热销房源

    getThreeIcon: prefix + 'out/index.php/appproduct/getThreeIcon', //分类页上面的 限时特价、发现好物、新品上架 三个入口的图片
    getAllCate: prefix + 'out/index.php/appproduct/getAllCate', //分类页主数据
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //

    getProList: prefix + 'out/index.php/appproduct/plist',//{ctype:88,limit:10,order:0,page:1} 分类产品列表
    getStqnList: prefix + 'out/index.php/appfind/ecology',//{ctype:42,limit:10,page:1}分类 黔南非遗--列表
    getStqnDetail: prefix + 'out/index.php/ecological_detail',//id 参数为 生态黔南列表里每一篇文章对应的id
    getHighLevelItems: prefix + 'out/index.php/appproduct/getCateByCateid',//{ctype:88} 获取筛选项--类型

    getProDetail: prefix + 'out/index.php/appproduct/details',//{pid:816,tmpid:865376036149522} 商品信息
    getCartNumber: prefix + 'out/index.php/appproduct/shopcart_num',//{uid,tmpid:865376036149522} 当前用户购物车数量
}
export {url}