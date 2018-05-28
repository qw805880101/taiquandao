import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";

let type = '';


@connect(({campus, loading}) => ({
  campus,
  submitting: loading.effects['campus/addCampus'],
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
    this.props.dispatch({ //机构注册
      type: 'campus/addCampus',
      payload: {
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

    const {campus: {addCampusData}} = this.props;
    console.log("addCampusData,", addCampusData);
    if (addCampusData.code != null && addCampusData.code != 200) {
      alert(addCampusData.message);
    } else if (addCampusData.code === 200 && addCampusData.success) {
      // alert(addCampusData.message != null ? addCampusData.message : '成功');
      this.props.dispatch(routerRedux.push('/campus/campusList'));
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="新增校区"
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

