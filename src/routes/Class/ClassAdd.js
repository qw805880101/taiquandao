import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";

let type = '';


@connect(({classModel, campus, loading}) => ({
  classModel,
  campus,
  submitting: loading.effects['classModel/addClass'],
}))
export default class Agency extends React.PureComponent {

  componentDidMount() {
    const id = getQueryUrlParamVal('userId');
    type = getQueryUrlParamVal('type'); //
    if (id != null && id != '') {
      this.getAgencyDetail(id);
    }
    this.getCampusList();
  }

  getCampusList = (data) => { //获取校区
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

  getAgencyDetail = (id) => { //获取机构详情
    // this.props.dispatch({
    //   type: 'agency/getAgencyDetail',
    //   payload: {
    //     "appVersion": "1.0.0",
    //     "timestamp": new Date().getTime(),
    //     "terminalOs": "H5",
    //     "actNo": "B2003",
    //     "userId": sessionStorage.userId,
    //     "id": id,
    //   },
    // });
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

    const {campus: {campusList}, classModel: {addClassData}} = this.props;

    if (addClassData.code != null && addClassData.code != 200) {
      alert(addClassData.message);
    } else if (addClassData.code === 200 && addClassData.success) {
      // alert(addCampusData.message != null ? addCampusData.message : '成功');
      this.props.dispatch(routerRedux.push('/teach/teachList'));
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="班级管理"
        >
          <FromTab
            Submit={this.Submit}
            Delete={this.onDelete}
            campusList={campusList}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}

