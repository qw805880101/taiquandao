import {addClass, queryClass} from '../services/api';

export default {
  namespace: 'classModel',

  state: {
    classList: [],
    addClassData: '',
  },

  effects: {
    * queryClassList({payload}, {call, put}) {
      const response = yield call(queryClass, payload);
      yield put({
        type: 'queryClassListResult',
        payload: response,
      });
    },
    * addClass({payload}, {call, put}) {
      const response = yield call(addClass, payload);
      console.log("addClassData:",response);
      yield put({
        type: 'addClassResult',
        payload: response,
      });
    },
  },

  reducers: {
    queryClassListResult(state, {payload}) {
      return {
        ...state,
        classList: payload.data,
      };
    },

    addClassResult(state, {payload}) {
      return {
        ...state,
        addClassData: payload,
      };
    },
  },
};
