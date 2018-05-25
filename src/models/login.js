import {routerRedux} from 'dva/router';
import {fakeAccountLogin,testApi} from '../services/api';
import {setAuthority} from '../utils/authority';
import {reloadAuthorized} from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    loginData: {
      result: {}
    },
    test:'',
    testList:[],
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.code == 200 && response.result.respCode === '0000') {
        console.log("登录成功");
        reloadAuthorized();
        const path = {
          pathname: '/',
          state: response.result,
        }
        sessionStorage.userId = response.result.permissions.userId;
        sessionStorage.menuData = JSON.stringify(response.result.permissions.menuList);
        yield put(routerRedux.push(path));

      }
    },
    * logout(_, {put, select}) {
      console.log("调用logout方法");
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);

        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority('admin');
      return {
        ...state,
        loginData: payload,
      };
    },
  },
};