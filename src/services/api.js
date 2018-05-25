import {stringify} from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/agw/api/userlogin/1.0/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function getUserListData() {
  return request('/api/userListData', {
    method: 'POST',
  });
}

export async function getUser(params) {
  return request('/agw/api/user/1.0/viewUserList', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getToken(params) {
  return request('/agw/auth/login?username=23ok33' + Math.random() + '&password=324omkok,ok;213' + Math.random(), {
    method: 'POST',
  });
}

/**
 * 获取菜单列表
 * @param params
 * @returns {Promise<Object>}
 */
export async function getMenu(params) {
  return request('agw/api/menu/1.0/list', {
    method: 'POST',
    body: params
  });
}

/**
 * 添加/修改用户
 * @param params
 * @author 江美元
 * @date  2018/05/07
 * @returns {Promise<Object>}
 */
export async function userAdd(params) {
  return request('agw/api/user/1.0/updateUserInfo', {
    method: 'POST',
    body: params
  });
}

/**
 * 获取用户详情
 * @param params
 * @returns {Promise<Object>}
 */
export async function getUserDetail(params) {
  return request('agw/api/user/1.0/viewUserDetail', {
    method: 'POST',
    body: params
  });
}

/**
 * 删除用户
 * @param params
 * @returns {Promise<Object>}
 */
export async function delUser(params) {
  return request('agw/api/user/1.0/deleteUser', {
    method: 'POST',
    body: params
  });
}

/**
 * 机构注册/修改
 * @param params
 * @returns {Promise<Object>}
 */
export async function agencyRegister(params) {
  return request('agw/api/agencybusinessfacade/1.0/updateoffice', {
    method: 'POST',
    body: params
  });
}

/**
 * 机构列表
 * @param params
 * @returns {Promise<Object>}
 */
export async function agencyList(params) {
  return request('agw/api/agencybusinessfacade/1.0/viewofficelist', {
    method: 'POST',
    body: params
  });
}

/**
 * 机构删除
 * @param params
 * @returns {Promise<Object>}
 */
export async function delAgency(params) {
  return request('agw/api/agencybusinessfacade/1.0/deleteOffice', {
    method: 'POST',
    body: params
  });
}

/**
 * 机构详情
 * @param params
 * @returns {Promise<Object>}
 */
export async function agencyDetail(params) {
  return request('agw/api/agencybusinessfacade/1.0/viewofficedetail', {
    method: 'POST',
    body: params
  });
}

/**
 * 获取资源信息
 * @param params
 * @returns {Promise<Object>}
 */
export async function getSource(params) {
  return request('/agw/api/resourcemanagement/1.0/viewsourcelist', {
    method: 'POST',
    body: params,
  });
}

/**
 * 获取资源详细信息
 * @param params
 * @returns {Promise<Object>}
 */
export async function getSourceDetail(params) {
  return request('/agw/api/resourcemanagement/1.0/viewsourcedetail', {
    method: 'POST',
    body: params,
  });
}

/**
 * 添加资源信息
 * @param params
 * @returns {Promise<Object>}
 */
export async function addSourceContent(params) {
  return request('/agw/api/resourcemanagement/1.0/updatesource', {
    method: 'POST',
    body: params,
  });
}


/**
 * 添加资源信息
 * @param params
 * @returns {Promise<Object>}
 */
export async function delSourceContent(params) {
  return request('/agw/api/resourcemanagement/1.0/deletesource', {
    method: 'POST',
    body: params,
  });
}

/*渠道列表*/
export async function getChannellist(params) {
  return request('/agw/api/channelbusinessfacade/1.0/viewchannellist', {
    method: 'POST',
    body: params,
  });
}

/*单个渠道详细信息*/
export async function getSingle(params) {
  return request('/agw/api/channelbusinessfacade/1.0/viewchanneldetail', {
    method: 'POST',
    body: params,
  });
}

/*提交单个渠道信息表单*/
export async function submitSingleChannel(params) {
  return request('/agw/api/channelbusinessfacade/1.0/updatechannel', {
    method: 'POST',
    body: params,
  });
}

/*删除渠道*/
export async function deletechannel(params) {
  return request('/agw/api/channelbusinessfacade/1.0/deletechannel', {
    method: 'POST',
    body: params,
  });
}

/*商户列表*/
export async function getMerchantlist(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/viewmerchantllist', {
    method: 'POST',
    body: params,
  });
}

/*6.6	查询未被关联的商户(多选框)*/
export async function viewRelMerChantList(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/viewRelMerChantList', {
    method: 'POST',
    body: params,
  });
}

/*单个商户详细信息*/
export async function getSingleMerchant(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/viewmerchantdetail', {
    method: 'POST',
    body: params,
  });
}

/*提交单个商户信息表单*/
export async function submitSingleMerchant(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/updatemerchant', {
    method: 'POST',
    body: params,
  });
}

/*删除商户*/
export async function deleteMerchant(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/deletemerchant', {
    method: 'POST',
    body: params,
  });
}

/*删除商户*/
export async function testApi(params) {
  return request('/agw/api/merchantsbusinessfacade/1.0/deletemerchant', {
    method: 'POST',
    body: params,
  });
}

/*权限维护*/
export async function updateAuthority(params) {
  return request('/agw/api/authorization/1.0/updateauthority', {
    method: 'POST',
    body: params,
  });
}

/*获取角色权限列表*/
export async function viewRoleAuthorityList(params) {
  return request('/agw/api/authorization/1.0/viewroleauthority', {
    method: 'POST',
    body: params,
  });


}

/**
 * 角色管理
 * @param params
 * @author 江美元
 * @returns {Promise<Object>}
 */
export async function getRoleListData(params) {
  return request('/agw/api/baserole/1.0/viewrolelist', {
    method: 'POST',
    body: params,
  });
}

/**
 * 角色用户列表
 * @param params
 * @author 江美元
 * @returns {Promise<Object>}
 */
export async function getRoleUserList(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}

/**
 * 角色用户关系
 * @param params
 * @author 江美元
 * @returns {Promise<Object>}
 */
export async function getRoleUserRelationship(params) {
  return request('/agw/api/baserole/1.0/updateroleuser', {
    method: 'POST',
    body: params,
  });
}


/******************************************* 订单管理 ********************************************/

/**
 * 订单管理/订单查询/查询订单列表
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryOrderList(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 订单管理/订单查询/查询订单明细
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryOrderDetail(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 订单管理/订单审批/查询审批订单列表
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryApproveOrderList(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 订单管理/订单审批/查询审批订单详情
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryApproveOrderDetail(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 订单管理/订单审批/审批订单提交
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function approveOrder(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**************************************** 配置管理/产品管理 ****************************************/


/**
 * 配置管理/产品管理/添加产品
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function createProductInfo(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 配置管理/产品管理/查询产品列表
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryProductList(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 配置管理/产品管理/查询产品详细
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryProductDetail(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}


/**
 * 配置管理/产品管理/修改产品信息
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function modifyProductInfo(params) {
  return request('/agw/api/baserole/1.0/viewroleuserlist', {
    method: 'POST',
    body: params,
  });
}

/**
 * 授信申请/查询客户列表
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryCreditList(params) {
  return request('/agw/api/credit/1.0/querycreditlist', {
    method: 'POST',
    body: params,
  });
}

/**
 * 授信申请/查询客户明细
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function queryCreditDetailInfo(params) {
  return request('/agw/api/credit/1.0/querycreditdetailinfo', {
    method: 'POST',
    body: params,
  });
}

/**
 * 授信审批/查询客户明细
 * @param params
 * @author victor
 * @returns {Promise<Object>}
 */
export async function searchCreditApplyList(params) {
  return request('/agw/api/credit/1.0/searchcreditapplylist', {
    method: 'POST',
    body: params,
  });
}



