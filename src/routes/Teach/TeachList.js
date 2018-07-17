import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

let delResult = '';

@connect(({teach, loading}) => ({
  teach,
  submitting: loading.effects['teach/queryTeachList'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
    this.getTeachList();
  }

  state = {
    searchName: '',
    goodsData: [],
    isMerIdSearch: false,
    goodsColumns: [{
      title: '序号',
      dataIndex: 'idNum',
      key: 'idNum',
    }, {
      title: '教师名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <a onClick={() => {
            console.log("e", e);
          }} href={'#/teach/teachAdd?userId=' + e.id}>编辑</a>

          <Divider type="vertical"/>
          <Popconfirm title="确定删除此教师" onConfirm={() => {
            this.onDelete(e.id);
          }}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
  }

  getTeachList = (data) => { //获取校区
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
      // this.setState({goodsData: this.props.teach.teachList});
    }
    this.setState({searchName: e.target.value});
  }

  searchOnclick = () => {
    if (this.state.searchName === '') {
      // this.setState({goodsData: this.props.teach.teachList});
      this.getTeachList();
    } else {
      this.isMerIdSearch = true;
      // this.changeTab();
      this.getTeachList({Name: this.state.searchName});
    }
  }

  changeTab = () => { //查询
    const {searchName} = this.state;
    const reg = new RegExp(searchName, 'gi');
    this.setState({
      goodsData: this.props.teach.teachList.map((record) => {
        let searchNameMatch;
        if (searchName) {
          if (record.name == null) {
            return null;
          }
          searchNameMatch = record.name.match(reg);
          if (!searchNameMatch) {
            return null;
          }
        }
        return {
          ...record,
          name: (
            <span>
              {record.name.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{searchNameMatch[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }

  addUser = () => {
    this.props.dispatch(routerRedux.push('/teach/teachAdd'));
  }


  render() {

    const {teach: {teachList}} = this.props;

    if (!this.isMerIdSearch) { //判断是否筛选
      if (teachList) {
        for (let i = 0; i < teachList.length; i++) {
          teachList[i].idNum = i + 1;
        }
        this.setState({goodsData: teachList});
      }
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout title="教师管理"
        >
          <Input key='merName' placeholder="根据教师名称查询" style={{width: '200px'}} onChange={this.changeSearchId}/>
          <Button type="search" style={{width: '100px', marginLeft: '20px'}} onClick={this.searchOnclick}>查询</Button>
          <Button type="search"
                  style={{
                    width: '100px',
                    marginLeft: '20px',
                  }}
                  onClick={this.addUser}>添加教师</Button>

          <Table
            style={{marginBottom: 24, marginTop: 24, marginRight: 24}}
            dataSource={this.state.goodsData}
            columns={this.state.goodsColumns}
            rowKey="id"
            onDelete={this.onDelete}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}
