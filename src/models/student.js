import {addStudent, queryStudent} from '../services/api';

export default {
  namespace: 'student',

  state: {
    studentList: '',
    addStudentData: '',
  },

  effects: {
    * queryStudentList({payload}, {call, put}) {
      const response = yield call(queryStudent, payload);
      yield put({
        type: 'queryStudentListResult',
        payload: response,
      });
    },
    * addStudent({payload}, {call, put}) {
      const response = yield call(addStudent, payload);
      console.log("addStudentData:",response);
      yield put({
        type: 'addStudentResult',
        payload: response,
      });
    },
  },

  reducers: {
    queryStudentListResult(state, {payload}) {
      return {
        ...state,
        studentList: payload.data,
      };
    },

    addStudentResult(state, {payload}) {
      return {
        ...state,
        addStudentData: payload,
      };
    },
  },
};
