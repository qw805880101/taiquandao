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
      {item.date}
    </Option>
  );
});

const campusData = [{
  id: '00',
  date: '浦东校区',
}, {
  id: '01',
  date: '峨山校区',
}, {
  id: '02',
  date: '闵行校区',
}];

const classData = [{
  id: '00',
  date: '1班',
}, {
  id: '01',
  date: '2班',
}, {
  id: '02',
  date: '3班',
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
  }

  render() {
    const {getFieldDecorator} = this.props.form;

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
            {getFieldDecorator('studentName', {
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
            {getFieldDecorator('studentCampus', {
              rules: [
                {required: true, message: '请选择所在校区!'},
              ],
            })(
              <Select onChange={this.onCampusChange} placeholder="请选择所在校区">
                {agencyTreeData(campusData)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所在班级"
            hasFeedback
          >
            {getFieldDecorator('studentClass', {
              rules: [
                {required: true, message: '请选择所在班级!'},
              ],
            })(
              <Select placeholder={this.state.classStatus ? "请先选择所在校区" : "请选择所在班级"} disabled={this.state.classStatus}>
                {agencyTreeData(classData)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="学员段位"
            hasFeedback
          >
            {getFieldDecorator('studentRank', {
              rules: [
                {required: true, message: '请输入学员段位!'},
              ],
            })(
              <Input placeholder="请输入学员段位"/>
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
