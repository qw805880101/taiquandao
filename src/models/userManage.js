import {routerRedux} from 'dva/router';
import {getUser, userAdd, getUserDetail, delUser} from '../services/api';

let pathName='';
let pathHash='';
if(window.location.hash){
  pathHash=window.location.hash.split('/')[1];
}


export default {
  namespace: 'userManage',

  state: {
    status: undefined,
    list: [],
    userAddResult: '',
    userDetailResult: '',
    delUserResult: '',
  },

  effects: {
    * getUser({payload}, {call, put}) {
      const response = yield call(getUser, payload);
      if (response.result.userList.length <= 0) {
        // alert(response.result.respMsg);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    * userAdd({payload}, {call, put}) {
      const response = yield call(userAdd, payload);
      yield put({
        type: 'userAddStatus',
        payload: response,
      });

      if (response.result.respCode != null && response.result.respCode != '0000') {
        alert(response.result.respMsg);
      } else if (response.result.respCode === '0000') {
        alert(response.result.respMsg);
        if(pathHash==='ChannelManage'){
          pathName='/channelManage/channelUserManage';
        }else if(pathHash==='business'){
          pathName='/merManage/merUserManage';
        }else{
          pathName='/userManage/userList';
        }

        const path = {
          pathname: pathName,
          state: response.result,
        }
        yield put(routerRedux.push(path));
      }
    },

    * getUserDetail({payload}, {call, put}) {
      const response = yield call(getUserDetail, payload);
      yield put({
        type: 'userDetailStatus',
        payload: response,
      });
    },

    * delUser({payload, callback}, {call, put}) {
      const response = yield call(delUser, payload);
      yield put({
        type: 'delUserStatus',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, action) {
      return {
        ...state,
        list: action.payload.result.userList,
      };
    },

    userAddStatus(state, action) {
      return {
        ...state,
        userAddResult: action.payload.result,
      };
    },
    userDetailStatus(state, action) {
      return {
        ...state,
        userDetailResult: action.payload.result,
      };
    },
    delUserStatus(state, action) {
      return {
        ...state,
        delUserResult: action.payload.result,
      };
    }
  },
};
