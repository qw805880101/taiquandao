import React from 'react';
import {Link} from 'dva/router';
import {Button, Form, Input, Select} from 'antd';
import styles from '../UserManage/UserStyle.less';

const FormItem = Form.Item;
const Option = Select.Option;

//动态添加树结构参数
const agencyTreeData = data => data.map((item) => {
  return (
    <Option key={item.id}>
      {item.name}
    </Option>
  );
});

const rankData = [{
  id: '00',
  name: '白',
}, {
  id: '01',
  name: '白黄',
}, {
  id: '03',
  name: '黄',
}, {
  id: '04',
  name: '黄绿',
}, {
  id: '05',
  name: '绿',
}, {
  id: '06',
  name: '绿蓝',
}, {
  id: '07',
  name: '蓝',
}, {
  id: '08',
  name: '蓝红',
}, {
  id: '09',
  name: '红',
}, {
  id: '10',
  name: '红黑',
}, {
  id: '11',
  name: '黑一段',
}];

class UserDetailsFromImp extends React.Component {

  state = {
    disPlay: false,
    delDisplay: 'block',
    classStatus: true,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.Submit(values);
      }
    });
  }

  handleReset = () => { //重置表单属性
    this.props.form.resetFields();
  }

  handleDelete = () => { //删除
    this.props.Delete();
  }

  onCampusChange = (e) => {
    console.log("e:", e);
    this.setState({classStatus: false})
    this.props.getClassList(e);
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {campusList, classList} = this.props;

    // if (type === 'add') { //类型新增
    //   this.disPlay = true;
    //   this.delDisplay = 'none';
    // } else if (type === 'mod') { //类型修改
    //   this.disPlay = true;
    //   this.delDisplay = 'block';
    // } else {
    //   this.disPlay = false;
    //   this.delDisplay = 'none';
    // }
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12, offset: 1},
    };

    return (
      <Form onSubmit={this.handleSubmit} onReset={this.handleReset} style={{overflow: 'hidden'}}>
        <div style={{float: 'left', minWidth: '50%', width: '100%'}}>
          <FormItem
            {...formItemLayout}
            label="学员姓名"
            hasFeedback
          >
            {getFieldDecorator('Name', {
              rules: [
                {required: true, message: '请输入学员姓名!'},
              ],
            })(
              <Input placeholder="请输入学员姓名"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所在校区"
            hasFeedback
          >
            {getFieldDecorator('TrainingOrganizationId', {
              rules: [
                {required: true, message: '请选择所在校区!'},
              ],
            })(
              <Select onChange={this.onCampusChange} placeholder="请选择所在校区">
                {agencyTreeData(campusList)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所在班级"
            hasFeedback
          >
            {getFieldDecorator('ClassId', {
              rules: [
                {required: true, message: '请选择所在班级!'},
              ],
            })(
              <Select placeholder={this.state.classStatus ? "请先选择所在校区" : "请选择所在班级"} disabled={this.state.classStatus}>
                {agencyTreeData(classList)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="学员段位"
            hasFeedback
          >
            {getFieldDecorator('IdCardNo', {
              rules: [
                {required: true, message: '请选择学员段位!'},
              ],
            })(
              <Select placeholder="请选择学员段位">
                {agencyTreeData(rankData)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="剩余课时"
            hasFeedback
          >
            {getFieldDecorator('studentDate', {
              rules: [
                {required: true, message: '请输入剩余课时!'},
              ],
            })(
              <Input placeholder="请输入剩余课时"/>
            )}
          </FormItem>

          <FormItem
            wrapperCol={{span: 12, offset: 6}}
          >
            <Button type="primary" htmlType="submit" className={styles.btn}>保存</Button>
            <Button type="primary" htmlType="reset" className={styles.btn}>取消</Button>
            {/*<Button type="primary" onClick={this.handleDelete}*/}
            {/*className={this.delDisplay == 'none' ? styles.btnNone : styles.btn}>删除</Button>*/}
          </FormItem>

        </div>

      </Form>
    );
  }
}

const UserDetailsFrom = Form.create()(UserDetailsFromImp);

export default UserDetailsFrom;
