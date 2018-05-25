import {getToken, getMenu} from "../services/api";
import {routerRedux} from 'dva/router';

export default {
  namespace: 'global',

  state: {
    token: '',
    menus: [],
  },

  effects: {
    * getToken({payload}, {call, put}) {
      const response = yield call(getToken, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },
    * fetchMenus({payload}, {call, put}) {
      const response = yield call(getMenu, payload);
      yield put({
        type: 'changeMenuData',
        payload: response,
      });
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      return {
        ...state,
        token: action.payload.token,
      };
    },
    changeMenuData(state, action) {
      return {
        ...state,
        menus: action.payload.result.permissions.menuList,
      };
    },
  },

};
