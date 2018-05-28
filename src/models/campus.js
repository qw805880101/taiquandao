import {addCampus, queryCampus} from '../services/api';

export default {
  namespace: 'campus',

  state: {
    campusList: [],
    addCampusData: '',
  },

  effects: {
    * queryCampusList({payload}, {call, put}) {
      const response = yield call(queryCampus, payload);
      yield put({
        type: 'queryCampusListResult',
        payload: response,
      });
    },
    * addCampus({payload}, {call, put}) {
      const response = yield call(addCampus, payload);
      console.log("addCampusData:",response);
      yield put({
        type: 'addCampusResult',
        payload: response,
      });
    },
  },

  reducers: {
    queryCampusListResult(state, {payload}) {
      return {
        ...state,
        campusList: payload.data,
      };
    },

    addCampusResult(state, {payload}) {
      return {
        ...state,
        addCampusData: payload,
      };
    },
  },
};
