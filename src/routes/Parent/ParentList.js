import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

let delResult = '';

const data = [{
  campusId: '01',
  parentName: '张三',
  phone: '15613232321',
  title: '他爸',
  student: '张三之子',
}, {
  campusId: '02',
  parentName: '李四',
  phone: '15613232322',
  title: '他爸',
  student: '李四之子',
}, {
  campusId: '03',
  parentName: '王麻子',
  phone: '15613232323',
  title: '他妈',
  student: '王麻子之子',
},];

@connect(({parent, loading}) => ({
  parent,
  submitting: loading.effects['parent/queryParent'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
    this.getParentList();
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
      title: '家长名称',
      dataIndex: 'parentName',
      key: 'parentName',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '称谓',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '学员',
      dataIndex: 'student',
      key: 'student',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <a onClick={() => {
            console.log("e", e);
          }} href={'#/parent/parentAdd?userId=' + e.id}>编辑</a>

          <Divider type="vertical"/>
          <Popconfirm title="确定删除此家长" onConfirm={() => {
            this.onDelete(e.id);
          }}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
  }

  getParentList = (data) => { //获取家长列表请求
    if (!data) {
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'parent/queryParent',
      payload: {
        ...data,
      }
    });
  }

  onDelete = (key) => {
    this.props.dispatch({
      type: 'parent/deleteParent',
      payload: {
        id: key
      },
      callback: () => {
        const delUserResult = this.props.parent.delParentResult;
        if (delUserResult && delUserResult.code == 200) {
          this.getParentList();
        }
      },
    });
  }

  changeSearchId = (e) => {
    if (e.target.value.length == 0) {
      // this.setState({goodsData: this.props.userManage.list});
    }
    this.setState({searchName: e.target.value});
  }

  searchOnclick = () => {
    if (this.state.searchName === '') {
      // this.setState({goodsData: this.props.userManage.list});
      this.getParentList();
    } else {
      this.isMerIdSearch = true;
      // this.changeTab();
      this.getParentList({Name: this.state.searchName});
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
    this.props.dispatch(routerRedux.push('/parent/parentAdd'));
  }

  tabChannel = (current, size) => {
    console.log("size:", current);
    this.getParentList({PageSize: current});
  }

  render() {

    const {submitting, parent: {parentList}} = this.props;


    if (!this.isMerIdSearch) { //判断是否筛选
      if (parentList) {
        for (let i = 0; i < parentList.list.length; i++) {
          parentList.list[i].idNum = i + 1;
        }
        this.setState({goodsData: parentList.list});
      }
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout title="家长管理"
        >
          <Input key='merName' placeholder="根据家长名称查询" style={{width: '200px'}} onChange={this.changeSearchId}/>
          <Button type="search" style={{width: '100px', marginLeft: '20px'}} onClick={this.searchOnclick}>查询</Button>
          <Button type="search"
                  style={{
                    width: '100px',
                    marginLeft: '20px',
                  }}
                  onClick={this.addUser}>添加家长</Button>

          <Table
            loading={submitting}
            style={{marginBottom: 24, marginTop: 24, marginRight: 24}}
            dataSource={this.state.goodsData}
            columns={this.state.goodsColumns}
            rowKey="id"
            onDelete={this.onDelete}
            pagination={{
              pageSize: parentList.pageSize ? parentList.pageSize : '',
              total: parentList.total,
              onChange: this.tabChannel
            }}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}
