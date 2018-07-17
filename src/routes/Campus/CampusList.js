import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({campus, loading}) => ({
  campus,
  submitting: loading.effects['campus/queryCampusList'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
    this.getCampusList();
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
      title: '校区名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '校区地址',
      dataIndex: 'campusAddress',
      key: 'campusAddress',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <a onClick={() => {
            console.log("e", e);
          }} href={'#/campus/campusAdd?id=' + e.id + '&name=' + e.name + '&address=' + e.address + '&type=1'}>编辑</a>

          <Divider type="vertical"/>
          <Popconfirm title="确定删除此校区" onConfirm={() => {
            this.onDelete(e.id);
          }}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    }],
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

  onDelete = (key) => {
    // console.log("key:", key);
    // // const dataSource = [...this.state.dataSource];
    // // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    // // this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'campus/delCampus',
      payload: {
        id: key
      },
      callback: () => {
        const delUserResult = this.props.campus.delCampusResult;
        if (delUserResult && delUserResult.code == 200) {
          this.getCampusList();
        }
      },
    });
  }

  changeSearchId = (e) => {
    if (e.target.value.length == 0) {
      // this.setState({goodsData: this.props.campus.campusList.list});
      // this.getCampusList();
    }
    this.setState({searchName: e.target.value});
  }

  searchOnclick = () => {
    if (this.state.searchName === '') {
      // this.setState({goodsData: this.props.campus.campusList.list});
      this.getCampusList();
    } else {
      this.isMerIdSearch = true;
      // this.changeTab();
      this.getCampusList({
        Name: this.state.searchName,
      })
    }
  }

  changeTab = () => { //查询
    const {searchName} = this.state;
    const reg = new RegExp(searchName, 'gi');
    this.setState({
      goodsData: this.props.campus.campusList.list.map((record) => {
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

  tabChannel = (current, size) => {
    console.log("size:", current);
    this.getCampusList({PageSize: current});
  }

  addUser = () => {
    this.props.dispatch(routerRedux.push('/campus/campusAdd'));
  }

  render() {

    const {submitting, campus: {campusList}} = this.props;


    if (!this.isMerIdSearch) { //判断是否筛选
      if (campusList) {
        for (let i = 0; i < campusList.list.length; i++) {
          campusList.list[i].idNum = i + 1;
        }
        this.setState({goodsData: campusList.list});
      }
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <PageHeaderLayout title="校区管理"
        >
          <Input key='merName' placeholder="根据校区名称查询" style={{width: '200px'}} onChange={this.changeSearchId}/>
          <Button type="search" style={{width: '100px', marginLeft: '20px'}} onClick={this.searchOnclick}>查询</Button>
          <Button type="search"
                  style={{
                    width: '100px',
                    marginLeft: '20px',
                  }}
                  onClick={this.addUser}>新增校区</Button>

          <Table
            loading={submitting}
            style={{marginBottom: 24, marginTop: 24, marginRight: 24}}
            dataSource={this.state.goodsData}
            columns={this.state.goodsColumns}
            rowKey="id"
            onDelete={this.onDelete}
            pagination={{
              pageSize: campusList.pageSize ? campusList.pageSize : '',
              total: campusList.total,
              onChange: this.tabChannel
            }}
          />
        </PageHeaderLayout>
      </div>
    );
  }
}
