import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";

let type = '';

@connect(({parent, campus, classModel, student, loading}) => ({
  parent,
  campus, classModel, student,
  submitting: loading.effects['classModel/addClass'],
}))
export default class Agency extends React.PureComponent {
  componentDidMount() {
    this.getCampusList();
  }

  state = {
    campusList: [],
    classList: [],
    studentList: [],
  }

  Submit = (values) => {
    console.log('提交的参数', values);
    this.props.dispatch({
      type: 'parent/addParent',
      payload: {
        ...values,
      }
    });
  }

  getCampusList = (data) => { //获取校区
    console.log("获取校区:",);
    if (!data) {
    }
    this.props.dispatch({
      type: 'campus/queryCampusList',
      payload: {
        ...data,
      }
    });
  }

  getClassList = (data) => { //获取班级列表请求
    if (!data) {
    }
    console.log("data:", data);
    this.props.dispatch({
      type: 'classModel/queryClassList',
      payload: {
        ...data,
      }
    });
  }

  getStudentList = (data) => { //获取学员列表请求
    if (!data) {
    }
    console.log("data:", data);
    this.props.dispatch({
      type: 'student/queryStudentList',
      payload: {
        ...data,
      }
    });
  }

  onDelete = () => { //删除机构请求
    // const key = getQueryUrlParamVal("userId");
    // console.log("key:", key);
    // // const dataSource = [...this.state.dataSource];
    // // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    // // this.isMerIdSearch = false;
    // this.props.dispatch({
    //   type: 'agency/delAgency',
    //   payload: {
    //     "appVersion": "1.0.0",
    //     "timestamp": new Date().getTime(),
    //     "terminalOs": "H5",
    //     "actNo": "B5004",
    //     ids: [key],
    //     userId: sessionStorage.userId
    //   },
    //   callback: () => {
    //     const delAgencyResult = this.props.agency.delAgencyResult;
    //     if (delAgencyResult && delAgencyResult.respCode == '0000') {
    //       if (delAgencyResult && delAgencyResult.respCode == '0000') { //删除成功
    //         alert(delAgencyResult.respMsg);
    //         this.props.dispatch(routerRedux.push('/agencyManage/agencyList'));
    //       } else {
    //         alert(delAgencyResult.respMsg);
    //       }
    //     }
    //   },
    // });
  }

  render() {

    const {campus: {campusList}, classModel: {classList}, student: {studentList}} = this.props;

    if (campusList && campusList.list) {
      this.state.campusList = campusList.list;
    }

    if (classList && classList.list) {
      this.state.classList = classList.list;
    }

    if (studentList && studentList.list) {
      this.state.studentList = studentList.list;
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="家长管理"
        >
          <FromTab
            Submit={this.Submit}
            Delete={this.onDelete}
            campusList={this.state.campusList}
            classList={this.state.classList}
            studentList={this.state.studentList}
            getClassList={this.getClassList}
            getStudentList={this.getStudentList}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}

