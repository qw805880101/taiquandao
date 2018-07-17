import {queryParent, addParent, updateParent, deleteParent} from '../services/api';

export default {
  namespace: 'parent',

  state: {
    parentList: '',
    addParentData: '',
    delParentResult: '',
    updateResultData: '',
  },

  effects: {
    * queryParent({payload}, {call, put}) {
      const response = yield call(queryParent, payload);
      yield put({
        type: 'queryParentListResult',
        payload: response,
      });
    },
    * addParent({payload, callback}, {call, put}) {
      const response = yield call(addParent, payload);
      console.log("addParentData:", response);
      yield put({
        type: 'addParentResult',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
    * updateParent({payload, callback}, {call, put}) {
      const response = yield call(updateParent, payload);
      console.log("updateData:", response);
      yield put({
        type: 'updateResult',
        payload: response,
      });

      if (callback) {
        callback();
      }
    },
    * deleteParent({payload, callback}, {call, put}) {
      const response = yield call(deleteParent, payload);
      console.log("addParentData:", response);
      yield put({
        type: 'delParentResult',
        payload: response,
      });
      if (callback) {
        callback();
      }
    },
  },

  reducers: {
    queryParentListResult(state, {payload}) {
      return {
        ...state,
        ParentList: payload.data,
      };
    },

    addParentResult(state, {payload}) {
      return {
        ...state,
        addParentData: payload,
      };
    },

    updateResult(state, {payload}) {
      return {
        ...state,
        updateResultData: payload,
      };
    },

    delParentResult(state, {payload}) {
      return {
        ...state,
        delParentResult: payload,
      };
    },
  },
};
