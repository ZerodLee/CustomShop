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

    getHotHouse: prefix + 'out/index.php/appfind/gethothouse',// 获取房源列表
    submitReserve: prefix + 'out/index.php/appfind/order',//我要预定--提交预定

    //搜索
    getHotSearch: prefix + 'out/index.php/appproduct/selectKey', // 搜索--获取搜索关键字

    getThreeIcon: prefix + 'out/index.php/appproduct/getThreeIcon', //分类页上面的 限时特价、发现好物、新品上架 三个入口的图片
    getAllCate: prefix + 'out/index.php/appproduct/getAllCate', //分类页主数据
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //
    // hotHouse: prefix + 'out/index.php/appproduct/getThreeIcon', //

    //商品列表 详情
    getProList: prefix + 'out/index.php/appproduct/plist',//{ctype:88,limit:10,order:0,page:1} 分类产品列表
    getStqnList: prefix + 'out/index.php/appfind/ecology',//{ctype:42,limit:10,page:1}分类 黔南非遗--列表
    getStqnDetail: prefix + 'out/index.php/ecological_detail',//id 参数为 生态黔南列表里每一篇文章对应的id
    getStqnDetailUrl: prefix + 'out/index.php/app/reserve',// id 参数为 生态黔南列表里每一篇文章对应的id
    getHighLevelItems: prefix + 'out/index.php/appproduct/getCateByCateid',//{ctype:88} 获取筛选项--类型

    getProDetail: prefix + 'out/index.php/appproduct/details',//{pid:816,tmpid:865376036149522} 商品信息
    getCartNumber: prefix + 'out/index.php/appproduct/shopcart_num',//{uid,tmpid:865376036149522} 当前用户购物车数量

    getComments: prefix + 'out/index.php/appproduct/commentlist',// {image=0,proid,limit,page} 查看评价

    //购物车
    getCart: prefix + 'out/index.php/appshopcart/list_shopcart',//{limit:10,page:1,uid:3620,tmpid:865376036149522} 购物车数据列表
    editCartNumber: prefix + 'out/index.php/appshopcart/edit_shopcart',// {id:160（商品id）,num:3,tmpid,uid:3620} 编辑--更新商品数量
    deleteCartItem: prefix + 'out/index.php/appshopcart/del_shopcart', //{id,tmpid,uid} 删除购物车数量
    comfirmBuy: prefix + 'out/index.php/appshoporder/get_buypro',//{shopids:[1160],uid:3620}结算--确认订单
    submitOrder: prefix + 'out/index.php/appshoporder/sub_orderinfo',//{shopids=[1106，903],addrid=437,is_jf=0,uid=3620}提交订单--创建订单

    addCart: prefix + 'out/index.php/appshopcart/add_shopcart', //{attrid,num,pid,tmpid,uid} 加入购物车
    collection: prefix + 'out/index.php/appcollection/collection', //{proid,uid} 添加收藏/取消收藏
    justBuy: prefix + 'out/index.php/appshoporder/get_buynowpro',// {attrid1,num,pid,uid} 立即购买
    submitOrderNow: prefix + 'out/index.php/appshoporder/sub_bunoworderinfo', //{attrid1,addrid,id_jf,num,pid,uid} 提价订单


    //个人中心
    getUserInfo: prefix + 'out/index.php/appmember/userinfo',//header:token 获取用户信息（详细信息，非微信信息）
    getOrderlist: prefix + 'out/index.php/apporder/orderList',//{status=4,userid=3620,limit=10,page=1} 获取我的订单
    getHistory: prefix + 'out/index.php/appbrowse/plist', //{uid=3620,limit=10,page=1} 我的足迹
    getCollection: prefix + 'out/index.php/appcollection/plist',// {uid,limit=10,page=1}我的收藏

    getAboutUrl: prefix + 'out/index.php/appshare/abouturl', // {type:26} 帮助中心 {type:25} 关于巨惠好花红
    
    changeName: prefix + 'out/index.php/appmember/changename', // {id,nickname} 编辑--昵称
    uploadFile: prefix + 'out/index.php/appmember/upload_file', // Content-Type: multipart/form-data {id} 编辑--头像
    changeGender: prefix + 'out/index.php/appmember/changegender', // {id,gender(1,0)} 编辑--性别
    changeBirth: prefix + 'out/index.php/appmember/changebirth', // {id,birthday} 编辑--生日

    getAddress: prefix + 'out/index.php/appmebaddr/get_addrlist',// token 地址管理--列表
    addAddress: prefix + 'out/index.php/appmebaddr/add_addr', //{addr,city,is_default=1,province,tel,username} token 添加新地址
    editAddress: prefix + 'out/index.php/appmebaddr/edit_addr',// {同上} 编辑地址--修改
    deleteAddress: prefix + 'out/index.php/appmebaddr/del_addr',//{id} token 删除地址
    defaultAddress: prefix + 'out/index.php/appmebaddr/edit_default_addr', // {id,is_default} 设为默认地址
    
    afterSale: prefix + 'out/index.php/appshoporderreturn/return_orderlist',// 退款/售后 列表数据  需要token

    //支付
    getPayParam: prefix + 'out/index.php/appshoporder/rsaSign',// {id,type,uid} 支付--获取支付参数

    cancelOrder: prefix + 'out/index.php/appshoporder/cancel_order',// {id} 取消订单
    remindOrder: prefix + 'out/index.php/apporder/remindDeliver',// {id,userid} 提醒发货
    confrimOrder: prefix + 'out/index.php/apporder/confirmGet',// {id,userid} 确认订单
    deleteOrder: prefix + 'out/index.php/apporder/delorder',// {id,userid} 删除订单
    getOrderDetail: prefix + 'out/index.php/apporder/orderDetail', // {id,userid} 订单详情，从列表进入的
    backAmount: prefix + 'out/index.php/appshoporderreturn/sub_orderinfo', //{} 申请退款
    backAmountDetail:prefix + 'out/index.php/appshoporderreturn/return_orderinfo', //{} 申请退款详情页

    modify_return:prefix+'out/index.php/appshoporderreturn/sub_orderupdate',//修改申请
    back_apply:prefix+'out/index.php/appshoporderreturn/sub_orderdel', //撤销申请
    see_wuliu:prefix+'out/index.php/app/logistics',
    
    upload_comment_photo:prefix+'out/index.php/upload/photo',//评论上传图片！
    send_comment:prefix+'out/index.php/apporder/orderSendComment' //提交评论
}
export {url}