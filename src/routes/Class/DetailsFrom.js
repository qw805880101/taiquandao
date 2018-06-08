import React from 'react';
import {Link} from 'dva/router';
import {Divider, Popconfirm, Select, Table, TimePicker} from 'antd';

const Option = Select.Option;

//动态添加树结构参数
const agencyTreeData = data => data.map((item) => {
  return (
    <Option key={item.id}>
      {item.name}
    </Option>
  );
});

const timeData = [];
for (let i = 0; i < 24; i++) {
  timeData.push(<Option key={i}>{i + '时'}</Option>);
}

const dateData = [{
  id: '00',
  name: '星期日',
}, {
  id: '01',
  name: '星期一',
}, {
  id: '02',
  name: '星期二',
}, {
  id: '03',
  name: '星期三',
}, {
  id: '04',
  name: '星期四',
}, {
  id: '05',
  name: '星期五',
}, {
  id: '06',
  name: '星期六',
},];

const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export default class UserDetailsFromImp extends React.Component {
  state = {
    editingKey: '',
    columns: [{
      title: '日期',
      dataIndex: 'name',
      width: '25%',
      editable: true,
      render: (text, record) => {
        return (
          <div>
            <Select style={{width: '100%'}} placeholder="请选择日期">
              {agencyTreeData(dateData)}
            </Select>
          </div>
        )
      }
    }, {
      title: '开始时间',
      dataIndex: 'age',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return (
          <div>
            <TimePicker format={'HH:mm'} style={{width: '100%'}}
                        placeholder="请选择开始时间"/>
          </div>
        )
      }
    }, {
      title: '结束时间',
      dataIndex: 'address',
      width: '20%',
      editable: true,
      render: (text, record) => {
        return (
          <div>
            <TimePicker format={'HH:mm'} style={{width: '100%'}}
                        placeholder="请选择开始时间"/>
          </div>
        )
      }
    }, {
      title: '操作',
      width: '20%',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
            <div>
              <a onClick={
                () => {

                }
              }>保存</a>

              <Divider type="vertical"/>

              <Popconfirm title="确定删除此课程" onConfirm={() => {
                this.onDelete(record.id);
              }}>
                <a>删除</a>
              </Popconfirm>
            </div>
          </div>
        );
      },
    }]
  };

  render() {

    const {lessonListResultList} = this.props;

    return (
      <Table
        pagination={{defaultPageSize: 5}}
        dataSource={lessonListResultList}
        columns={this.state.columns}
      />
    );
  }
}
