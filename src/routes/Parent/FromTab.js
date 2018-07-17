import React from 'react';
import {Link} from 'dva/router';
import {Button, Form, Input, Select} from 'antd';
import styles from '../UserManage/UserStyle.less';

const FormItem = Form.Item;
const Option = Select.Option;

const teachChildren = [];
for (let i = 10; i < 36; i++) {
  teachChildren.push(<Option key={'学员' + i + '号'}>{'学员' + i + '号'}</Option>);
}
//动态添加树结构参数
const agencyTreeData = data => data.map((item) => {
  return (
    <Option key={item.id}>
      {item.name}
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
    campusStatus: true,
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
    this.setState({campusStatus: false})
    this.props.getClassList({'TrainingOrganizationId': e});
  }

  onClassChange = (e) => {
    console.log("e:", e);
    this.setState({classStatus: false})
    this.props.getStudentList({'ClassId': e});
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const {campusList, classList, studentList} = this.props;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 12, offset: 1},
    };

    return (
      <Form onSubmit={this.handleSubmit} onReset={this.handleReset} style={{overflow: 'hidden'}}>
        <div style={{float: 'left', minWidth: '50%', width: '100%'}}>
          <FormItem
            {...formItemLayout}
            label="家长姓名"
            hasFeedback
          >
            {getFieldDecorator('parentName', {
              rules: [
                {required: false, message: '请输入家长姓名!'},
              ],
            })(
              <Input placeholder="请输入家长姓名"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机号码"
            hasFeedback
          >
            {getFieldDecorator('phone', {
              rules: [
                {required: true, message: '请输入手机号码!'},
              ],
            })(
              <Input type={'number'} maxLength={11} placeholder="请输入手机号码"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="称谓"
            hasFeedback
          >
            {getFieldDecorator('title', {
              rules: [
                {required: true, message: '请输入家长称谓!'},
              ],
            })(
              <Input placeholder="请输入家长称谓"/>
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
                {agencyTreeData(campusList)}
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
              <Select onChange={this.onClassChange} placeholder={this.state.campusStatus ? "请先选择所在校区" : "请选择所在班级"}
                      disabled={this.state.campusStatus}>
                {agencyTreeData(classList)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="学员姓名"
            hasFeedback
          >
            {getFieldDecorator('teachList', {
              rules: [
                {required: true, message: '请选择学员!'},
              ],
            })(
              <Select
                mode="tags"
                placeholder={this.state.classStatus ? "请先选择所在校区/班级" : "请选择学员"} disabled={this.state.classStatus}
              >
                {agencyTreeData(studentList)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="初始密码"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [
                {required: true, message: '请输入密码!'},
              ],
            })(
              <div>
                < Input placeholder="请输入密码" type="password"/>
                <Input type="password" style={{width: 0, height: 0, float: 'left', visibility: 'hidden'}}
                />
              </div>
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
