import {addClass, queryClass, lessonList, delClass} from '../services/api';

export default {
  namespace: 'classModel',

  state: {
    classList: '',
    addClassData: '',
    lessonListResultList: [],
    delClassResult: ''
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
      console.log("addClassData:", response);
      yield put({
        type: 'addClassResult',
        payload: response,
      });
    },
    * lessonList({payload}, {call, put}) {
      const response = yield call(lessonList, payload);
      console.log("lessonListData:", response);
      yield put({
        type: 'lessonListResult',
        payload: response,
      });
    },
    * delClass({payload, callback}, {call, put}) {
      const response = yield call(delClass, payload);
      console.log("lessonListData:", response);
      yield put({
        type: 'delClassResult',
        payload: response,
      });
      if (callback) {
        console.log("callback:",);
        callback();
      }
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
    lessonListResult(state, {payload}) {
      return {
        ...state,
        lessonListResultList: payload.data.list,
      };
    },
    delClassResult(state, {payload}) {
      return {
        ...state,
        delClassResult: payload,
      };
    },
  },
};
