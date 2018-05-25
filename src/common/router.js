import {createElement} from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import {getMenuData} from './menu';
import global from "../models/global";

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({namespace}) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  })
);

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = {...item};
      keys = {...keys, ...getFlatMenuData(item.children)};
    } else {
      keys[item.path] = {...item};
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['global', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/index': {
      component: dynamicWrapper(app, [], () => import('../routes/Index')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    //用户登录
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    //校区列表
    '/campus/campusList': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Campus/CampusList')),
    },
    //校区详情
    '/campus/campusAdd': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Campus/CampusAdd')),
    },
    //班级列表
    '/class/classList': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Class/ClassList')),
    },
    //班级详情
    '/class/classAdd': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Class/ClassAdd')),
    },
    //教师列表
    '/teach/teachList': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Teach/TeachList')),
    },
    //教师详情
    '/teach/teachAdd': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Teach/TeachAdd')),
    },
    //学员列表
    '/student/studentList': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Student/StudentList')),
    },
    //学员详情
    '/student/studentAdd': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Student/StudentAdd')),
    },
    //家长列表
    '/parent/parentList': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Parent/ParentList')),
    },
    //家长详情
    '/parent/parentAdd': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/Parent/ParentAdd')),
    },
    //用户管理/用户列表
    '/userManage/userList/': {
      component: dynamicWrapper(app, ['userManage', 'agency'], () => import('../routes/UserManage/UserList')),
    },

    //用户管理/用户列表/用户添加
    '/userManage/userList/userAdd': {
      component: dynamicWrapper(app, ['userManage', 'agency'], () => import('../routes/UserManage/UserAdd')),
    },

    '/userManage/UserSelect': {
      component: dynamicWrapper(app, [], () => import('../routes/UserManage/UserSelect')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },

    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },

    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
  };


  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
