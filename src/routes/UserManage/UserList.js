import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm, Tree} from 'antd';
import BaseLayouts from '../../layouts/BaseLayouts';
import {myCheckPermissions} from '../../components/Authorized/CheckPermissions';
import Authorized from "../../components/Authorized/Authorized";

const TreeNode = Tree.TreeNode;

let delResult = '';

let leftTree = [];

let allAgencyListData = [];

@connect(({userManage, agency, loading}) => ({
  userManage,
  agency,
  submitting: loading.effects['userManage/getUser' || 'userManage/delUser'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'userManage/getUser',
    });
    this.getAgencyList();
  }

  state = {
    agencyId: '',
    treeData: [],
    searchName: '',
    goodsData: [],
    isMerIdSearch: false,
    goodsColumns: [{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '登录名',
      dataIndex: 'loginName',
      key: 'loginName',
    }, {
      title: '租户代码',
      dataIndex: 'tenancyCode',
      key: 'tenancyCode',
    }, {
      title: '用户类别',
      dataIndex: 'userType',
      key: 'userType',
    }, {
      title: '用户等级',
      dataIndex: 'level',
      key: 'level',
    }, {
      title: '所属机构',
      dataIndex: 'merchantName',
      key: 'merchantName',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <Authorized
            authority={myCheckPermissions('agencyManage', 'agencyList', 'agencyModify')}
          >
            <a onClick={() => {
              console.log("e", e);
            }} href={'#/userManage/userList/userAdd?userId=' + e.id}>编辑</a>

            <Divider type="vertical"/>
          </Authorized>
          <Authorized
            authority={myCheckPermissions('agencyManage', 'agencyList', 'agencyDelete')}
          >
            <Popconfirm title="确定删除此用户" onConfirm={() => {
              this.onDelete(e.id);
            }}>
              <a>删除</a>
            </Popconfirm>
          </Authorized>
        </div>
      ),
    }],
  }

  getAgencyList = (data) => { //获取机构列表请求
    if (!data) {
      this.state.treeData = [];
      allAgencyListData = [];
      this.props.agency.agencyList = [];
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'agency/agencyList',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B2001",
        ...data,
      }
    });
  }

  onDelete = (key) => {
    console.log("key:", key);
    // const dataSource = [...this.state.dataSource];
    // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    // this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'userManage/delUser',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B5004",
        ids: [key],
        userId: sessionStorage.userId
      },
      callback: () => {
        const delUserResult = this.props.userManage.delUserResult;
        if (delUserResult && delUserResult.respCode == '0000') {
          if (this.state.agencyId) {
            this.getUser({"merchantId": this.state.agencyId});
            this.state.agencyId = '';
          } else {
            this.getUser();
          }
        }
      },
    });
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

  getUser = (data) => { //获取用户列表请求
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'userManage/getUser',
      payload: data,
    });
  }

  addUser = () => {
    this.props.dispatch(routerRedux.push('/userManage/userList/userAdd'));
  }

  onSelect = (selectedKeys, treeNode) => {
    console.log("info", treeNode.node.props.dataRef.id);
    const id = treeNode.node.props.dataRef.id;

    for (let i = 0; i < allAgencyListData.length; i++) {
      if (id == allAgencyListData[i].id) {
        this.state.agencyId = allAgencyListData[i].id;
        this.getUser({"merchantId": allAgencyListData[i].id});
      }
    }
  }


  onLoadData = (treeNode) => {
    console.log("treeNode", treeNode);
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      this.getAgencyList({"parentId": treeNode.props.id});

      setTimeout(() => {
        var childData = [];
        const content = this.props.agency.agencyList;
        if (content && content.length > 0) {
          for (var i = 0; i < content.length; i++) {
            const id = content[i].id;
            const menuName = content[i].officeName;
            childData.push({title: menuName, key: treeNode.props.id + i, id: id, isLeaf: true});
            allAgencyListData.push(content[i]);
          }
        }
        treeNode.props.dataRef.children = childData;
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item}/>;
    });
  }

  modifyData = (data) => {
    for (let i = 0; i < data.length; i++) {
      switch (data[i].userType) { //用户类别 1:机构用户、2:渠道用户、3:商户用户
        case '1':
          data[i].userType = '机构用户';
          break;
        case '2':
          data[i].userType = '渠道用户';
          break;
        case '3':
          data[i].userType = '商户用户';
          break;
      }
      if (data[i].level != null && data[i].level.length < 2) {
        data[i].level = data[i].level + '级';
      }
    }
    return data;
  }

  render() {
    const {userManage: {list, delUserResult}, submitting, agency: {agencyList}} = this.props; //获取请求返回的list数据

    if (allAgencyListData.length < 1) {
      allAgencyListData = agencyList;
    }

    if (!this.isMerIdSearch) { //判断是否筛选
      this.setState({goodsData: list});
    }

    if (this.state.treeData.length < 1) {
      if (agencyList) {
        for (let i = 0; i < agencyList.length; i++) {
          const id = agencyList[i].id;
          const menuName = agencyList[i].officeName;
          this.state.treeData.push({title: menuName, key: 0 + i, id: id});
        }
        leftTree = this.state.treeData;
      }
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <BaseLayouts title="机构用户管理"
                     leftPage={
                       <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
                         {this.renderTreeNodes(leftTree)}
                       </Tree>
                     }
        >
          <Input key='merName' placeholder="根据用户名查询" style={{width: '200px'}} onChange={this.changeSearchId}/>
          <Button type="search" style={{width: '100px', marginLeft: '20px'}} onClick={this.searchOnclick}>查询</Button>
          <Authorized
            authority={myCheckPermissions('agencyManage', 'agencyList', 'agencyRegist')}
          >
            <Button type="search"
                    style={{
                      width: '100px',
                      marginLeft: '20px',
                    }}
                    onClick={this.addUser}>新增</Button>
          </Authorized>

          <Table
            style={{marginBottom: 24, marginTop: 24, marginRight: 24}}
            dataSource={this.modifyData(this.state.goodsData)}
            columns={this.state.goodsColumns}
            loading={submitting}
            rowKey="id"
            onDelete={this.onDelete}
          />
        </BaseLayouts>
      </div>
    );
  }
}
