import request from '../utils/request';
import {setUrl} from "../utils/utils";


export async function getUser(params) {
  return request('/agw/api/user/1.0/viewUserList', {
    method: 'POST',
    body: params,
  });
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
 * 登录
 * @param params
 * @returns {Promise<Object>}
 */
export async function login(params) {
  return request('api/Account/Login?Mobile=' + params.Mobile + '&Password=' + params.Password, {
    method: 'POST',
  });
}

/**
 * 查询校区
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryCampus(params) {
  return request(setUrl('api/TrainingOrganization/Query', params), {
    method: 'GET',
  });
}

/**
 * 新增校区
 * @param params
 * @returns {Promise<Object>}
 */
export async function addCampus(params) {
  return request(setUrl('api/TrainingOrganization/Add', params), {
    method: 'POST',
  });
}

/**
 * 编辑校区
 * @param params
 * @returns {Promise<Object>}
 */
export async function update(params) {
  return request(setUrl('api/TrainingOrganization/Update', params), {
    method: 'POST',
  });
}

/**
 * 删除校区
 * @param params
 * @returns {Promise<Object>}
 */
export async function delCampus(params) {
  return request(setUrl('api/TrainingOrganization/Delete', params), {
    method: 'POST',
  });
}

/**
 * 查询班级
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryClass(params) {
  return request(setUrl('api/Class/Query', params), {
    method: 'GET',
  });
}

/**
 * 新增班级
 * @param params
 * @returns {Promise<Object>}
 */
export async function addClass(params) {
  return request(setUrl('api/Class/Add', params), {
    method: 'POST',
  });
}

/**
 * 删除班级
 * @param params
 * @returns {Promise<Object>}
 */
export async function delClass(params) {
  return request(setUrl('api/Class/Delete', params), {
    method: 'POST',
  });
}

/**
 * 查询教师
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryTeach(params) {
  return request(setUrl('api/Teacher/Query', params), {
    method: 'GET',
  });
}

/**
 * 新增教师
 * @param params
 * @returns {Promise<Object>}
 */
export async function addTeach(params) {
  return request(setUrl('api/Teacher/Add', params), {
    method: 'POST',
  });
}

/**
 * 查询学员
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryStudent(params) {
  return request(setUrl('api/Student/Query', params), {
    method: 'GET',
  });
}

/**
 * 新增学员
 * @param params
 * @returns {Promise<Object>}
 */
export async function addStudent(params) {
  return request(setUrl('api/Student/Add', params), {
    method: 'POST',
  });
}

/**
 * 课程列表
 * @param params
 * @returns {Promise<Object>}
 */
export async function lessonList(params) {
  return request(setUrl('api/teacher/lesson/LessonList', params), {
    method: 'POST',
  });
}

/**
 * 新增家长
 * @param params
 * @returns {Promise<Object>}
 */
export async function addParent(params) {
  return request(setUrl('api/Genearch/Add', params), {
    method: 'POST',
  });
}

/**
 * 查询家长
 * @param params
 * @returns {Promise<Object>}
 */
export async function queryParent(params) {
  return request(setUrl('api/Genearch/Query', params), {
    method: 'POST',
  });
}

/**
 * 删除家长
 * @param params
 * @returns {Promise<Object>}
 */
export async function deleteParent(params) {
  return request(setUrl('api/Genearch/Delete', params), {
    method: 'POST',
  });
}

/**
 * 编辑家长
 * @param params
 * @returns {Promise<Object>}
 */
export async function updateParent(params) {
  return request(setUrl('api/Genearch/Update', params), {
    method: 'POST',
  });
}




