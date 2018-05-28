/*

 ###################################  Create  ################################

 # File    : 结构管理/机构注册
 # Project : Ant-Design
 # Created : 2018-04-25
 # DevTeam : Wireless Development Team
 # Author  : 田超
 # Version : 1.0.0

 ###################################  Modify  #################################

 # Author  : victor
 # Version : 1.0.0
 # Notes   : 增加输入框提示语

 ##############################################################################

*/

import React from 'react';
import {Button, Form, Input} from 'antd';
import styles from '../UserManage/UserStyle.less';

const FormItem = Form.Item;

class UserDetailsFromImp extends React.Component {

  state = {
    disPlay: false,
    delDisplay: 'block',
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
            label="教师姓名"
            hasFeedback
          >
            {getFieldDecorator('Name', {
              rules: [
                {required: true, message: '请输入教师姓名!'},
              ],
            })(
              <Input placeholder="请输入教师姓名"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机号码"
            hasFeedback
          >
            {getFieldDecorator('Mobile', {
              rules: [
                {required: true, message: '请输入教师手机号码!'},
              ],
            })(
              <Input type={"number"} maxLength={"11"} placeholder="请输入教师手机号码"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="初始密码"
            hasFeedback
          >
            {getFieldDecorator('Password', {
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
