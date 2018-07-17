import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";

let type = '';

@connect(({classModel, teach, campus, loading}) => ({
  classModel,
  teach,
  campus,
  submitting: loading.effects['classModel/addClass'],
}))
export default class Agency extends React.PureComponent {

  componentDidMount() {
    const id = getQueryUrlParamVal('userId');
    type = getQueryUrlParamVal('type'); //
    this.getCampusList();
    this.getTeachList()
  }

  state = {
    campusList: [],
    teachList: [],
  }

  getCampusList = (data) => { //获取校区
    console.log("获取校区:",);
    if (!data) {
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'campus/queryCampusList',
      payload: {
        ...data,
      }
    });
  }
  getTeachList = (data) => { //获取教师列表
    console.log("获取教师:",);
    if (!data) {
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'teach/queryTeachList',
      payload: {
        ...data,
      }
    });
  }

  Submit = (values) => {
    console.log('提交的参数', values);
    values = {
      ...values,
      'classDate_1_startTime': values.classDate_1_startTime.format('HH:mm'),
      'classDate_1_endTime': values.classDate_1_endTime.format('HH:mm'),
      'classDate_2_startTime': values.classDate_2_startTime != null ? values.classDate_2_startTime.format('HH:mm') : '',
      'classDate_2_endTime': values.classDate_2_endTime != null ? values.classDate_2_endTime.format('HH:mm') : '',
      'classDate_3_startTime': values.classDate_3_startTime != null ? values.classDate_3_startTime.format('HH:mm') : '',
      'classDate_3_endTime': values.classDate_3_endTime != null ? values.classDate_3_endTime.format('HH:mm') : '',
    };
    console.log("values:", values);

    this.props.dispatch({
      type: 'classModel/addClass',
      payload: {
        ...values,
      }
    });
  }

  render() {

    const {campus: {campusList}, teach: {teachList}, classModel: {addClassData}} = this.props;

    if (campusList && campusList.list) {
      this.state.campusList = campusList.list;
    }
    if (teachList) {
      this.state.teachList = teachList;
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="班级管理"
        >
          <FromTab
            Submit={this.Submit}
            Delete={this.onDelete}
            campusList={this.state.campusList}
            teachList={this.state.teachList}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}

