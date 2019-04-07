// 以下是业务服务器API地址
//开发
// var WxApiRoot = 'https://baoxian.enn.cn/xaejb';
// 测试使用
var WxApiRoot = 'https://baoxian.enn.cn/xaejbtest/';
// 上线时使用
// var WxApiRoot = '';

module.exports = {
  ProductList: WxApiRoot + 'pms/api/insuranceProducts/wechatQueryClauses', //产品列表
  ProductCategory: WxApiRoot + 'pms/api/insuranceProducts/wechatQueryClauses', //获得分类数据
  ProductDetail: WxApiRoot + 'pms/api/insuranceProducts/', //获得商品的详情
  PlanDetial: WxApiRoot + 'pms/api/liabilityAmountTable/', //获得计划的详情
  ComperProductList: WxApiRoot + 'pms/api/insuranceProducts/_actions/findProductsByIdIn',//产品对比
  CompanyPhone: WxApiRoot + 'pms/api/insuranceCompanies/_actions/findInsuranceCompanyByCode?companyCode=',//保险公司电话
  TypeProductList: WxApiRoot + 'pms/api/insuranceProducts/_actions/findProductsByTypeIn',//产品推荐
  ProductAmount: WxApiRoot + 'pms/api/planPremiumRateTable/acalc',// 保费
  ProductUnderWriting: WxApiRoot + 'pms/api/productunderwriting/', //投保元素动态配置

  CatalogList: WxApiRoot + 'oss/api/articleCategories/_actions/findAllCategories', //专题分类
  TopicList: WxApiRoot + 'oss/api/articles/_actions/getArticlesByCategory', //专题列表
  TopicDetail: WxApiRoot + 'oss/api/articles/', //专题详情

  OrderSubmit: WxApiRoot + 'order/api/create/order', // 提交订单
  OrderCheckout: WxApiRoot + 'order/api/check/order', // 下单前信息确认
  OrderDetail: WxApiRoot + 'order/api/order/findById/', //订单详情
  CancelOrder: WxApiRoot + 'order/api/order/cancelorder/', // 退保
  OrderDetailByCode: WxApiRoot + 'order/api/order/findOrderByCode/',//表单详情

  
  OrderListWaitRenewal: WxApiRoot + 'advisor/api/advisor/waitrenewalorder/', //个人待续保保单列表
  OrderList: WxApiRoot + 'advisor/api/advisor/getmyorder', //个人订单列表
  PolicyList: WxApiRoot + 'advisor/api/advisor/getmypolicy', //个人保单列表
  ClientsList: WxApiRoot + 'advisor/api/advisor/getmyclients/', //代理人客户列表
  AdvisorInfo: WxApiRoot + 'advisor/api/advisor/getadvisorinfo/',//经纪人信息
  AdvisorInfoByPhone: WxApiRoot + 'advisor/api/advisor/getuserinfobyphone/',//经纪人信息
  AdvisorList: WxApiRoot + 'advisor/api/selling/advisor/getordersbyquery?size=100',
  OrderCommentSave: WxApiRoot + 'advisor/api/advisor/evluateorder',//保单评价
  getOrderComment: WxApiRoot + 'advisor/api/advisor/getevluateorder',//保单评价
  CustomerOrders: WxApiRoot + 'advisor/api/web/advisor/getcustomerorders/',//客户保单列表

  SaveOpenid: WxApiRoot + 'advisor/api/advisor/saveopenid', //绑定openid
  FeedbackAdd: WxApiRoot + 'advisor/api/advisor/savefeedbackinfo', //添加反馈
  UserIndex: WxApiRoot + 'advisor/api/advisor/getsigninfo/', //个人页面用户相关信息
  SaveUser: WxApiRoot + 'advisor/api/advisor/savewechatuser/',//　更新个人信息
  SavePolicyHolderInfo: WxApiRoot + 'advisor/api/advisor/savepolicyholderinfo',//更新投保人信息
  AdvisorLogin: WxApiRoot + 'advisor/api/advisor/signin',//经纪人登录
  AdvisorLoginOut: WxApiRoot + 'advisor/api/advisor/untieopenid/', //退出登录

  LoginByWeixin: WxApiRoot + 'channel/api/wechar/login', //微信登录
  OrderPrepay: WxApiRoot + 'channel/api/weipay', // 订单的微信支付会话
  QrCode: WxApiRoot + 'channel/api/wechar/qecode',//二维码生成
  OrderCommentSave: WxApiRoot + 'advisor/api/advisor/evluateorder',//保单评价
  BankCodeName: WxApiRoot +'order/api/web/order/getbankcodename?name=',//银行列表
  CancelOrder: WxApiRoot + 'order/api/order/cancelorder/',//退保试算
  CancelPolicy: WxApiRoot + 'order/api/order/cancelorder'

};
