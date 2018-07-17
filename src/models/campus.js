import {addCampus, queryCampus, delCampus, update} from '../services/api';

export default {
  namespace: 'campus',

  state: {
    campusList: '',
    addCampusData: '',
    delCampusResult: '',
    updateResultData: '',
  },

  effects: {
    * queryCampusList({payload}, {call, put}) {
      const response = yield call(queryCampus, payload);
      yield put({
        type: 'queryCampusListResult',
        payload: response,
      });
    },
    * addCampus({payload, callback}, {call, put}) {
      const response = yield call(addCampus, payload);
      console.log("addCampusData:", response);
      yield put({
        type: 'addCampusResult',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    * update({payload, callback}, {call, put}) {
      const response = yield call(update, payload);
      console.log("updateData:", response);
      yield put({
        type: 'updateResult',
        payload: response,
      });

      if (callback) {
        callback();
      }
    },
    * delCampus({payload, callback}, {call, put}) {
      const response = yield call(delCampus, payload);
      console.log("addCampusData:", response);
      yield put({
        type: 'delCampusResult',
        payload: response,
      });
      if (callback) {
        callback();
      }
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

    updateResult(state, {payload}) {
      return {
        ...state,
        updateResultData: payload,
      };
    },

    delCampusResult(state, {payload}) {
      return {
        ...state,
        delCampusResult: payload,
      };
    },
  },
};
