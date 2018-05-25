import {isUrl} from '../utils/utils';

const menuData = [{
  "name": "校区管理",
  "icon": "appstore-o",
  "path": "campus",
  "children": [{
    "name": "校区列表",
    "icon": "bars",
    "path": "campusList",
  }, {
    "name": "新增校区",
    "icon": "bars",
    "path": "campusAdd",
  }],
}, {
  "name": "班级管理",
  "icon": "appstore-o",
  "path": "class",
  "children": [{
    "name": "班级列表",
    "icon": "bars",
    "path": "classList",
  }, {
    "name": "新增班级",
    "icon": "bars",
    "path": "classAdd",
  }],
}, {
  "name": "教师管理",
  "icon": "appstore-o",
  "path": "teach",
  "children": [{
    "name": "教师列表",
    "icon": "bars",
    "path": "teachList",
  }, {
    "name": "添加教师",
    "icon": "bars",
    "path": "teachAdd",
  }],
}, {
  "name": "学员管理",
  "icon": "appstore-o",
  "path": "student",
  "children": [{
    "name": "学员列表",
    "icon": "bars",
    "path": "studentList",
  }, {
    "name": "添加学员",
    "icon": "bars",
    "path": "studentAdd",
  }],
}, {
  "name": "家长管理",
  "icon": "profile",
  "path": "parent",
  "children": [{
    "name": "家长列表",
    "icon": "bars",
    "path": "parentList",
  }, {
    "name": "添加家长",
    "icon": "bars",
    "path": "parentAdd",
  }],
}];


function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let {path} = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
