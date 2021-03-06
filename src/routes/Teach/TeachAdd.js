import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";

let type = '';

let isResult = false;

@connect(({teach, loading}) => ({
  teach,
  submitting: loading.effects['teach/addTeach'],
}))
export default class Agency extends React.PureComponent {

  componentDidMount() {
    const id = getQueryUrlParamVal('userId');
    type = getQueryUrlParamVal('type'); //
    if (id != null && id != '') {
      this.getAgencyDetail(id);
    }
  }

  Submit = (values) => {
    console.log('提交的参数', values);
    isResult = true;
    this.props.dispatch({ //添加教师
      type: 'teach/addTeach',
      payload: {
        userId:sessionStorage.userId,
        ...values
      },
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

    const {teach: {addTeachData}} = this.props;
    console.log("addCampusData,", addTeachData);
    if (addTeachData.code != null && addTeachData.code != 200 && isResult) {
      isResult = false;
      alert(addTeachData.message);
    } else if (addTeachData.code === 200 && addTeachData.success) {
      // alert(addCampusData.message != null ? addCampusData.message : '成功');
      this.props.dispatch(routerRedux.push('/teach/teachList'));
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="教师管理"
        >
          <FromTab
            Submit={this.Submit}
            Delete={this.onDelete}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}

