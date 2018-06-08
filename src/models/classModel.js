import {addClass, queryClass, lessonList} from '../services/api';

export default {
  namespace: 'classModel',

  state: {
    classList: [],
    addClassData: '',
    lessonListResultList: []
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
  },
};
