import React from 'react';
import {Link} from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FromTab from './FromTab';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from "../../utils/utils";


@connect(({campus, loading}) => ({
  campus,
  submitting: loading.effects['campus/addCampus'],
}))
export default class Agency extends React.PureComponent {

  state = {
    campus: '',
    type: '',
  }

  componentDidMount() {
    const id = getQueryUrlParamVal('id');
    const name = getQueryUrlParamVal('name'); //
    const address = getQueryUrlParamVal('address'); //
    this.state.type = getQueryUrlParamVal('type'); //
    if (id && name && address) {
      this.setState({
        campus: {id: id, name: name, address: address}
      });
    } else {
      this.setState({
        campus: ''
      });
    }
  }

  Submit = (values) => {
    console.log('提交的参数', values);
    if (this.state.type === '1') {
      this.props.dispatch({ //编辑校区
        type: 'campus/update',
        payload: {
          Id: this.state.campus.id,
          ...values
        },
        callback: () => {
          const {campus: {updateResultData}} = this.props;
          if (updateResultData && updateResultData.code === 200 && updateResultData.success) {
            this.props.dispatch(routerRedux.push('/campus/campusList'));
          } else {
            alert(updateResultData.message);
          }
        }
      });
    } else {
      this.props.dispatch({ //添加校区
        type: 'campus/addCampus',
        payload: {
          ...values
        },
        callback: () => {
          const {campus: {addCampusData}} = this.props;
          if (addCampusData && addCampusData.code === 200 && addCampusData.success) {
            this.props.dispatch(routerRedux.push('/campus/campusList'));
          } else {
            alert(addCampusData.message);
          }
        }
      });
    }
  }

  render() {

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout
          title="校区管理"
        >
          <FromTab
            Submit={this.Submit}
            Delete={this.onDelete}
            campus={this.state.campus}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}

