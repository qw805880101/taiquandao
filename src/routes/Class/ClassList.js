import React from 'react';
import {Link, routerRedux} from 'dva/router';
import {connect} from 'dva';
import {Input, Spin, Button, Table, Divider, Popconfirm, Modal} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DetailsFrom from './DetailsFrom';


let delResult = '';

@connect(({classModel, loading}) => ({
  classModel,
  submitting: loading.effects['classModel/queryClassList'],
}))

export default class UserDisplay extends React.PureComponent {
  componentDidMount() {
    this.getClassList();
  }

  state = {
    visible: false,
    searchName: '',
    goodsData: [],
    isMerIdSearch: false,
    lessonListResultList: [],
    goodsColumns: [{
      title: '序号',
      dataIndex: 'idNum',
      key: 'idNum',
    }, {
      title: '班级名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '所在校区',
      dataIndex: 'orgName',
      key: 'orgName',
    }, {
      title: '段位',
      dataIndex: 'danDesc',
      key: 'danDesc',
    }, {
      title: '操作',
      key: 'action',
      render: (e) => (
        <div>
          <a onClick={() => {
            console.log("e", e);
          }} href={'#/class/classAdd?userId=' + e.id}>编辑</a>
          <Divider type="vertical"/>
          <Popconfirm title="确定删除此班级" onConfirm={() => {
            this.onDelete(e.id);
          }}>
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical"/>
          <a onClick={() => {
            console.log("e", e);
            this.showModal();
          }}>课程详情</a>
        </div>
      ),
    }],
  }

  showModal = () => {
    this.getLessonList();
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  getLessonList = (data) => {
    if (!data) {
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'classModel/lessonList',
      payload: {
        ...data,
      }
    });
  }

  getClassList = (data) => {
    if (!data) {
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'classModel/queryClassList',
      payload: {
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
      type: 'classModel/delClass',
      payload: {
        id: key,
      },
      callback: () => {
        const delUserResult = this.props.classModel.delClassResult;
        if (delUserResult && delUserResult.code == 200) {
          this.getClassList();
        }
      },
    });
  }

  changeSearchId = (e) => {
    if (e.target.value.length == 0) {
      // this.setState({goodsData: this.props.classModel.classList});
    }
    this.setState({searchName: e.target.value});
  }

  searchOnclick = () => {
    if (this.state.searchName === '') {
      // this.setState({goodsData: this.props.classModel.classList});
      this.getClassList();
    } else {
      this.isMerIdSearch = true;
      // this.changeTab();
      this.getClassList({
        Name: this.state.searchName,
      })
    }
  }

  changeTab = () => { //查询
    const {searchName} = this.state;
    const reg = new RegExp(searchName, 'gi');
    this.setState({
      goodsData: this.props.classModel.classList.list.map((record) => {
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
    this.props.dispatch(routerRedux.push('/class/classAdd'));
  }

  tabChannel = (current, size) => {
    console.log("size:", current);
    this.getClassList({PageSize: current});
  }

  render() {

    const {classModel: {classList, lessonListResultList}} = this.props;

    if (!this.isMerIdSearch) { //判断是否筛选
      if (classList) {
        for (let i = 0; i < classList.list.length; i++) {
          classList.list[i].idNum = i + 1;
        }
        this.setState({goodsData: classList.list});
      }
    }

    if (this.state.visible) {
      this.setState({lessonListResultList: lessonListResultList});
    }

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
            dataSource={this.state.goodsData}
            columns={this.state.goodsColumns}
            rowKey="id"
            onDelete={this.onDelete}
            pagination={{
              pageSize: classList.pageSize ? classList.pageSize : '',
              total: classList.total,
              onChange: this.tabChannel
            }}
          />
        </PageHeaderLayout>

        <div>
          <Modal width={'80%'}
                 title="课程详情"
                 visible={this.state.visible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
          >
            <div style={{padding: '0 10%'}}>
              <DetailsFrom
                Submit={this.Submit}
                Delete={this.onDelete}
                lessonListResultList={this.state.lessonListResultList}
              />
            </div>
          </Modal>
        </div>


      </div>
    );
  }
}
