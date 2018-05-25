import React from 'react';
import { Table, Button,Form,Select ,Input} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const columns = [{
  title: '序号',
  dataIndex: 'num',
  render: text => <a>{text}</a>,
}, {
  title: '用户名',
  dataIndex: 'name',
}, {
  title: '登录名',
  dataIndex: 'loginName',
}, {
  title: '单位',
  dataIndex: 'unit',
}, {
  title: '性别',
  dataIndex: 'sex',
}, {
  title: '启用',
  dataIndex: 'start',
}];
const data = [{
  key: '1',
  num: '1',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '2',
  num: '2',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '3',
  num: '3',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '4',
  num: '4',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}, {
  key: '5',
  num: '5',
  name: 'John Brown',
  loginName: 32,
  unit: 'New York No. 1 Lake Park',
  sex: '女',
  start: '有效',
}];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  }
};

function handleChange(value) {
  console.log(`selected ${value}`);
}


class UserSelect extends React.PureComponent {
  render () {
    const { getFieldDecorator } = this.props.form;

    return(
      <div style={{background:'#fff',padding:'2%'}}>
        <Form style={{overflow:'hidden'}} layout="inline">
          <FormItem
            {...formItemLayout}
            label="用户名"
            style={{float:'left'}}
          >
            <Input placeholder="用户名查询" style={{ width: 200 }} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用户类型"
            style={{float:'left'}}
          >
            {getFieldDecorator('userType', {
              rules: [{ required: false, message: 'Please select your gender!' }],
              onChange: this.handleSelectChange,
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            )}
          </FormItem>
          <FormItem style={{float:'left'}}>
            <Button type="primary" style={{marginRight:10}}>添加用户</Button>
            <Button type="primary" >移除用户</Button>
          </FormItem>
        </Form>


        <Table columns={columns} dataSource={data} rowSelection={rowSelection} bordered style={{marginTop:15}} />
      </div>
    )
  }
}
const UserSelects = Form.create()(UserSelect);
export default UserSelects;
