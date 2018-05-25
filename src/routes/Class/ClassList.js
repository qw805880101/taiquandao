import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

let delResult = '';

const data = [{
  campusId: '01',
  className: '黑带1班',
  campus: '浦东校区',
  rank: '黑带',
}, {
  campusId: '02',
  className: '黑带2班',
  campus: '峨山校区',
  rank: '黑带',
}, {
  campusId: '03',
  className: '黑带3班',
  campus: '浦东校区',
  rank: '黑带',
},];

@connect(({userManage, agency, loading}) => ({
  userManage,
  agency,
  submitting: loading.effects['userManage/getUser' || 'userManage/delUser'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
  }

  state = {
    searchName: '',
    goodsData: [],
    isMerIdSearch: false,
    goodsColumns: [{
      title: '班级名称',
      dataIndex: 'className',
      key: 'className',
    }, {
      title: '所在校区',
      dataIndex: 'campus',
      key: 'campus',
    }, {
      title: '段位',
      dataIndex: 'rank',
      key: 'rank',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <a onClick={() => {
            console.log("e", e);
          }} href={'#/class/classAdd?userId=' + e.id}>详情</a>

          <Divider type="vertical"/>
          <Popconfirm title="确定删除此班级" onConfirm={() => {
            this.onDelete(e.id);
          }}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
  }

  getAgencyList = (data) => { //获取机构列表请求
    // if (!data) {
    //   this.state.treeData = [];
    //   allAgencyListData = [];
    //   this.props.agency.agencyList = [];
    // }
    // this.isMerIdSearch = false;
    // this.props.dispatch({
    //   type: 'agency/agencyList',
    //   payload: {
    //     "appVersion": "1.0.0",
    //     "timestamp": new Date().getTime(),
    //     "terminalOs": "H5",
    //     "actNo": "B2001",
    //     ...data,
    //   }
    // });
  }

  onDelete = (key) => {
    // console.log("key:", key);
    // // const dataSource = [...this.state.dataSource];
    // // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    // // this.isMerIdSearch = false;
    // this.props.dispatch({
    //   type: 'userManage/delUser',
    //   payload: {
    //     "appVersion": "1.0.0",
    //     "timestamp": new Date().getTime(),
    //     "terminalOs": "H5",
    //     "actNo": "B5004",
    //     ids: [key],
    //     userId: sessionStorage.userId
    //   },
    //   callback: () => {
    //     const delUserResult = this.props.userManage.delUserResult;
    //     if (delUserResult && delUserResult.respCode == '0000') {
    //       if (this.state.agencyId) {
    //         this.getUser({"merchantId": this.state.agencyId});
    //         this.state.agencyId = '';
    //       } else {
    //         this.getUser();
    //       }
    //     }
    //   },
    // });
  }

  changeSearchId = (e) => {
    if (e.target.value.length == 0) {
      this.setState({goodsData: this.props.userManage.list});
    }
    this.setState({searchName: e.target.value});
  }

  searchOnclick = () => {
    if (this.state.searchName === '') {
      this.setState({goodsData: this.props.userManage.list});
    } else {
      this.isMerIdSearch = true;
      this.changeTab();
    }
  }

  changeTab = () => { //查询
    const {searchName} = this.state;
    const reg = new RegExp(searchName, 'gi');
    this.setState({
      goodsData: this.props.userManage.list.map((record) => {
        let searchNameMatch;
        if (searchName) {
          if (record.userName == null) {
            return null;
          }
          searchNameMatch = record.userName.match(reg);
          if (!searchNameMatch) {
            return null;
          }
        }
        return {
          ...record,
          userName: (
            <span>
              {record.userName.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{searchNameMatch[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  addUser = () => {
    this.props.dispatch(routerRedux.push('/class/classAdd'));
  }


  render() {
    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout title="班级管理"
        >
          <Input key='merName' placeholder="根据班级名称查询" style={{width: '200px'}} onChange={this.changeSearchId}/>
          <Button type="search" style={{width: '100px', marginLeft: '20px'}} onClick={this.searchOnclick}>查询</Button>
          <Button type="search"
                  style={{
                    width: '100px',
                    marginLeft: '20px',
                  }}
                  onClick={this.addUser}>新增班级</Button>

          <Table
            style={{marginBottom: 24, marginTop: 24, marginRight: 24}}
            dataSource={data}
            columns={this.state.goodsColumns}
            rowKey="id"
            onDelete={this.onDelete}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}
