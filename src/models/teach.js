import {addTeach, queryTeach} from '../services/api';

export default {
  namespace: 'teach',

  state: {
    teachList: [],
    addTeachData: '',
  },

  effects: {
    * queryTeachList({payload}, {call, put}) {
      const response = yield call(queryTeach, payload);
      yield put({
        type: 'queryTeachListResult',
        payload: response,
      });
    },
    * addTeach({payload}, {call, put}) {
      const response = yield call(addTeach, payload);
      console.log("addTeachData:",response);
      yield put({
        type: 'addTeachResult',
        payload: response,
      });
    },
  },

  reducers: {
    queryTeachListResult(state, {payload}) {
      return {
        ...state,
        teachList: payload.data,
      };
    },

    addTeachResult(state, {payload}) {
      return {
        ...state,
        addTeachData: payload,
      };
    },
  },
};
