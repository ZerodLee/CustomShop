const prefix = 'https://www.qntv3h.com/'
const url = {
    tmpid:865376036149522,
    phoneInfo:'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
    wxLogin: prefix + 'out/index.php/applogin/get_session_key', // 微信登录

    //首页
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

    //商品列表 详情
    getProList: prefix + 'out/index.php/appproduct/plist',//{ctype:88,limit:10,order:0,page:1} 分类产品列表
    getStqnList: prefix + 'out/index.php/appfind/ecology',//{ctype:42,limit:10,page:1}分类 黔南非遗--列表
    getStqnDetail: prefix + 'out/index.php/ecological_detail',//id 参数为 生态黔南列表里每一篇文章对应的id
    getHighLevelItems: prefix + 'out/index.php/appproduct/getCateByCateid',//{ctype:88} 获取筛选项--类型

    getProDetail: prefix + 'out/index.php/appproduct/details',//{pid:816,tmpid:865376036149522} 商品信息
    getCartNumber: prefix + 'out/index.php/appproduct/shopcart_num',//{uid,tmpid:865376036149522} 当前用户购物车数量

    //购物车
    getCart: prefix + 'out/index.php/appshopcart/list_shopcart',//{limit:10,page:1,uid:3620,tmpid:865376036149522} 购物车数据列表
    editCartNumber: prefix + 'out/index.php/appshopcart/edit_shopcart',// {id:160（商品id）,num:3,tmpid,uid:3620} 编辑--更新商品数量
    comfirmBuy: prefix + 'out/index.php/appshoporder/get_buypro ',//{shopids:[1160],uid:3620}结算--确认订单
    submitOrer: prefix + 'out/index.php/appshoporder/sub_orderinfo ',//{shopids=[1106，903],addrid=437,is_jf=0,uid=3620}提交订单--创建订单

    //个人中心
    getUserInfo: prefix + 'out/index.php/appmember/userinfo',//header:token 获取用户信息（详细信息，非微信信息）
    getOrderlist: prefix + 'out/index.php/apporder/orderList',//{status=4,userid=3620,limit=10,page=1} 获取我的订单
    getHistory: prefix + 'out/index.php/appbrowse/plist', //{uid=3620,limit=10,page=1} 我的足迹
    
    changeName: prefix + 'out/index.php/appmember/changename', // {id,nickname} 编辑--昵称
    uploadFile: prefix + 'out/index.php/appmember/upload_file', // Content-Type: multipart/form-data {id} 编辑--头像
    changeGender: prefix + 'out/index.php/appmember/changegender', // {id,gender(1,0)} 编辑--性别
    changeBirth: prefix + 'out/index.php/appmember/changebirth', // {id,birthday} 编辑--生日

}
export {url}