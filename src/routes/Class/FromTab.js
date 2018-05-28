import React from 'react';
import {Link} from 'dva/router';
import {Button, Form, Input, Select, TimePicker} from 'antd';
import styles from '../UserManage/UserStyle.less';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

const teachChildren = [];
for (let i = 10; i < 36; i++) {
  teachChildren.push(<Option key={'老师' + i + '号'}>{'老师' + i + '号'}</Option>);
}
const courseChildren = [];
for (let i = 10; i < 36; i++) {
  courseChildren.push(<Option key={'课程' + i + '号'}>{'课程' + i + '号'}</Option>);
}

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
}, {
  id: '12',
  name: '混',
}];

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

    const {campusList} = this.props;

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
            label="班级名称"
            hasFeedback
          >
            {getFieldDecorator('Name', {
              rules: [
                {required: true, message: '请输入班级名称!'},
              ],
            })(
              <Input placeholder="请输入班级名称"/>
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
              <Select placeholder="请选择所在校区">
                {agencyTreeData(campusList)}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="老师"
            hasFeedback
          >
            {getFieldDecorator('TeacherId', {
              rules: [
                {required: true, message: '请选择老师!'},
              ],
            })(
              <Select
                mode="tags"
                placeholder="请选择老师"
              >
                {teachChildren}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="段位"
            hasFeedback
          >
            {getFieldDecorator('rank', {
              rules: [
                {required: true, message: '请选择段位!'},
              ],
            })(
              <Select placeholder="请选择段位">
                {agencyTreeData(rankData)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上课时间"
            hasFeedback
          >
            {getFieldDecorator('classDate_1_date', {
              rules: [
                {required: true, message: '请选择上课时间!'},
              ],
            })(
              <Select style={{width: '30%'}} placeholder="请选择日期">
                {agencyTreeData(dateData)}
              </Select>
            )}
            {getFieldDecorator('classDate_1_startTime', {
              rules: [
                {required: true, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择开始时间"/>
            )}
            {getFieldDecorator('classDate_1_endTime', {
              rules: [
                {required: true, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择结束时间"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上课时间"
            hasFeedback
          >
            {getFieldDecorator('classDate_2_date', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <Select style={{width: '30%'}} placeholder="请选择日期">
                {agencyTreeData(dateData)}
              </Select>
            )}
            {getFieldDecorator('classDate_2_startTime', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择开始时间"/>
            )}
            {getFieldDecorator('classDate_2_endTime', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择结束时间"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="上课时间"
            hasFeedback
          >
            {getFieldDecorator('classDate_3_date', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <Select style={{width: '30%'}} placeholder="请选择日期">
                {agencyTreeData(dateData)}
              </Select>
            )}
            {getFieldDecorator('classDate_3_startTime', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择开始时间"/>

            )}
            {getFieldDecorator('classDate_3_endTime', {
              rules: [
                {required: false, message: '请选择上课时间!'},
              ],
            })(
              <TimePicker format={'HH:mm'} style={{width: '30%', marginLeft: '5%'}} placeholder="请选择结束时间"/>

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
