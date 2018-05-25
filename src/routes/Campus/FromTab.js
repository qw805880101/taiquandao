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
import {Link} from 'dva/router';
import {Button, Form, Input, Radio, Select} from 'antd';
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
            label="校区名称"
            hasFeedback
          >
            {getFieldDecorator('campusName', {
              rules: [
                {required: true, message: '请输入校区名称!'},
              ],
            })(
              <Input placeholder="请输入校区名称"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="校区地址"
            hasFeedback
          >
            {getFieldDecorator('campusAddress', {
              rules: [
                {required: true, message: '请输入校区地址!'},
              ],
            })(
              <Input placeholder="请输入校区地址"/>
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
