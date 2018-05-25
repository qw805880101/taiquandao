import React from 'react';
import {Link} from 'dva/router';
import {
  Input, Form, Select, Checkbox, Radio,
  Button, Upload, Icon, Tree, Divider
} from 'antd';
import BaseLayouts from '../../layouts/BaseLayouts';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {getQueryUrlParamVal} from '../../utils/utils';
import styles from '../UserManage/UserStyle.less';
import Avatar from '../../components/Avatar/Avatar';

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode;

const userType = [{
  label: '机构用户',
  value: '1',
}, {
  label: '渠道用户',
  value: '2',
}, {
  label: '商户用户',
  value: '3',
}];

const selectDataLeve = [{
  label: '1级',
  value: '1',
}, {
  label: '2级',
  value: '2',
}, {
  label: '3级',
  value: '3',
}];

let leftTree = []; //左侧树形菜单参数

let allAgencyListData = []; //所有机构列表

let userDetailResultData = ''; //用户详情

const roleData = [
  {label: '业务员', value: '3', disabled: false},
  {label: '财务', value: '2', disabled: false},
  {label: '风控经理', value: '1', disabled: false},
  {label: '超级管理员', value: '0', disabled: false},
];

@connect(({userManage, agency, loading}) => ({
  userManage,
  agency,
  submitting: loading.effects['userManage/userAdd'],
}))

export default class UserDetails extends React.PureComponent {

  state = {
    display: "none",
    modDisplay: "none",
    treeData: [],
    agencyData: '',
    userDetailResult: '',
  }

  componentDidMount() {
    const id = getQueryUrlParamVal('userId');
    if (id != null && id != '') {
      // 显示右侧信息
      this.setState({modDisplay: "block"});
      this.getUserDetail(id);
      this.getAgencyList({"queryAll": "1"});
    } else {
      this.getAgencyList();
    }
  }

  Submit = (values) => { //保存提交按钮
    console.log('提交的参数', values);
    this.props.dispatch({
      type: 'userManage/userAdd',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B5001",
        "userId": sessionStorage.userId,
        "id": getQueryUrlParamVal('userId'),
        ...values
      },
    });
  }

  handleDelete = () => { //删除用户
    const key = getQueryUrlParamVal("userId");
    // const dataSource = [...this.state.dataSource];
    // this.setState({dataSource: dataSource.filter(item => item.key !== key)});
    // this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'userManage/delUser',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B5004",
        ids: [key],
        userId: sessionStorage.userId
      },
      callback: () => {
        const delUserResult = this.props.userManage.delUserResult;
        if (delUserResult && delUserResult.respCode == '0000') { //删除成功
          alert(delUserResult.respMsg);
          this.props.dispatch(routerRedux.push('/userManage/userList'));
        } else {
          alert(delUserResult.respMsg);
        }
      },
    });
  }

  getUserDetail = (id) => { //获取用户详情
    this.props.dispatch({
      type: 'userManage/getUserDetail',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B5003",
        "id": id,
      },
    });
  }

  onSelect = (data, treeNode) => { //树形控件点击返回
    // 显示右侧信息
    this.setState({
      display: "block",
      userDetailResult: treeNode.node.props.dataRef,
    });
    // 获取信息
    console.log("data", treeNode.node.props.dataRef);
  }

  getAgencyList = (data) => { //获取机构列表请求
    if (!data) {
      this.state.treeData = [];
      allAgencyListData = [];
      this.props.agency.agencyList = [];
    }
    this.isMerIdSearch = false;
    this.props.dispatch({
      type: 'agency/agencyList',
      payload: {
        "appVersion": "1.0.0",
        "timestamp": new Date().getTime(),
        "terminalOs": "H5",
        "actNo": "B2001",
        ...data,
      }
    });
  }

  onLoadData = (treeNode) => { //树形结构加载
    console.log("treeNode", treeNode);
    return new Promise((resolve) => {
      if (treeNode.props.children) {
        resolve();
        return;
      }

      this.getAgencyList({"parentId": treeNode.props.id});

      setTimeout(() => {
        var childData = [];
        const content = this.props.agency.agencyList;
        if (content && content.length > 0) {
          for (var i = 0; i < content.length; i++) {
            const id = content[i].id;
            const menuName = content[i].officeName;
            childData.push({title: menuName, key: treeNode.props.id + i, id: id, merchantId: id, isLeaf: true});
            allAgencyListData.push(content[i]);
          }
        }
        treeNode.props.dataRef.children = childData;
        this.setState({
          treeData: [...this.state.treeData],
        });
        resolve();
      }, 1000);
    });
  }

  renderTreeNodes = (data) => { //树形结构循环遍历参数
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataRef={item}/>;
    });
  }

  render() {

    const {submitting, userManage: {userDetailResult}, agency: {agencyList}} = this.props;

    if (allAgencyListData.length < 1) {
      allAgencyListData = agencyList;
    }

    if (!userDetailResult) {
      userDetailResultData = this.state.userDetailResult;
    } else {
      userDetailResultData = userDetailResult;
    }

    if (this.state.treeData.length < 1) {
      if (agencyList) {
        for (let i = 0; i < agencyList.length; i++) {
          const id = agencyList[i].id;
          const menuName = agencyList[i].officeName;
          this.state.treeData.push({title: menuName, key: 0 + i, id: id, merchantId: id});
        }
        leftTree = this.state.treeData;
      }
    }

    return (
      <div style={{background: '#fff', height: '100%'}}>
        <div style={{height: '100%', display: this.state.modDisplay === 'none' ? 'block' : 'none'}}>

          <BaseLayouts title="添加用户"
                       leftPage={
                         <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
                           {this.renderTreeNodes(this.state.treeData)}
                         </Tree>
                       }
          >
            <div style={{display: this.state.display}}>
              <UserDetailsFrom
                Submit={this.Submit}
                loading={submitting}
                deleteStatus={'none'}
                userDetailResult={userDetailResultData}
                agencyListData={allAgencyListData}
                agencyData={this.state.agencyData}
              />
            </div>
          </BaseLayouts>
        </div>

        <div style={{background: '#fff', display: this.state.modDisplay}}>
          <PageHeaderLayout title="管理用户详情">
            <UserDetailsFrom
              Submit={this.Submit}
              Delete={this.handleDelete}
              deleteStatus={'block'}
              loading={submitting}
              userDetailResult={userDetailResult}
              agencyListData={agencyList}
              agencyData={this.state.agencyData}
            />
          </PageHeaderLayout>
        </div>
      </div>
    );
  }
}

let userDetail = '';

class UserDetailsFromImp extends React.Component {

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

  /**
   * 获取上传图片base64参数
   * @param e
   * @returns {*}
   */
  normFile = (e) => {
    if (e) {
      return e;
    }
    return '';
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {loading, userDetailResult, agencyListData} = this.props;

    if (userDetailResult) {
      userDetail = userDetailResult;
    }

    if (userDetailResult != null && userDetailResult.userList) {
      userDetail = userDetailResult.userList;
    }

    const formItemLayout = {
      labelCol: {span: 6,},
      wrapperCol: {span: 12, offset: 1},
    };

    //动态添加树结构参数
    const loop = data => data.map((item) => {
      return (
        <Option key={item.value}>
          {item.label}
        </Option>
      );
    });

    //动态添加树结构参数
    const agencyTreeData = data => data.map((item) => {
      return (
        <Option key={item.id}>
          {item.officeName}
        </Option>
      );
    });

    return (
      <Form loading={loading} onReset={this.handleReset} onSubmit={this.handleSubmit} style={{overflow: 'hidden'}}>

        <div style={{float: 'left', minWidth: '50%', width: '100%'}}>
          <FormItem
            {...formItemLayout}
            label="所属机构"
            hasFeedback
          >
            {getFieldDecorator('merchantId', {
              rules: [
                {required: true, message: '请选择所属机构!'},
              ],
              initialValue: userDetail.merchantId
            })(
              <Select placeholder="请选择所属机构" disabled={true}>
                {agencyTreeData(agencyListData)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="用户类别"
            hasFeedback
          >
            {getFieldDecorator('userType', {
              rules: [
                {required: true, message: '请选择用户类别!'},
              ],
              initialValue: userDetail.userType
            })(
              <Select placeholder="请选择用户类别">
                {loop(userType)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="姓名"
          >
            {getFieldDecorator('userName', {
              rules: [{required: true, message: '请输入姓名'}],
              initialValue: userDetail.userName
            })(
              <Input placeholder="请输入姓名"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="英文名"
          >
            {getFieldDecorator('englishName', {rules: [{required: false}], initialValue: userDetail.englishName})(
              <Input placeholder="请输入英文名"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="登录名"
          >
            {getFieldDecorator('loginName', {
              rules: [{required: true, message: '请输入登录名'}],
              initialValue: userDetail.loginName
            })(
              <Input placeholder="请输入登录名" type="text"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}],
            })(
              <div>
                < Input placeholder="请输入密码" type="password"/>
                <Input  type="password" style={{width: 0, height: 0, float: 'left', visibility: 'hidden'}}
                />
              </div>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="租户代码"
          >
            {getFieldDecorator('tenancyCode', {
              rules: [{required: true, message: '请输入租户代码'}],
              initialValue: userDetail.tenancyCode
            })(
              <Input placeholder="请输入租户代码" type="text"/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="等级"
          >
            {getFieldDecorator('level', {
              rules: [
                {required: false,},
              ],
              initialValue: userDetail.level
            })(
              <Select placeholder="请选择所属等级">
                {loop(selectDataLeve)}
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="职务"
          >
            {getFieldDecorator('position', {rules: [{required: false}], initialValue: userDetail.position})(
              <Input placeholder="请输入职务" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="工号"
          >
            {getFieldDecorator('jobNumber', {rules: [{required: false}], initialValue: userDetail.jobNumber})(
              <Input placeholder="请输入工号" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('telephone', {rules: [{required: false}], initialValue: userDetail.telephone})(
              <Input placeholder="请输入电话" type={"number"}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮件"
          >
            {getFieldDecorator('email', {rules: [{required: false}], initialValue: userDetail.email})(
              <Input placeholder="请输入电话" type={"email"}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="是否允许登录"
          >
            {getFieldDecorator('enableLogin', {initialValue: userDetail.enableLogin})(
              <RadioGroup>
                <Radio value="1">是</Radio>
                <Radio value="0">否</Radio>
              </RadioGroup>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="顺序"
          >
            {getFieldDecorator('input-number', {initialValue: userDetail.email})(
              <Input placeholder="请输入顺序" />
            )}
          </FormItem>

          <FormItem {...formItemLayout}
                    label="角色：">
            {getFieldDecorator('roleIds', {
              rules: [{required: true, message: '请选择角色'}],
              initialValue: userDetail.rolesInfo
            }, {valuePropName: 'checked',})(
              <CheckboxGroup options={roleData}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="头像"
          >
            {getFieldDecorator('userImg', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{required: false, message: '请上传头像'}],
            })(
              <Avatar onChange={(e) => {
              }}/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="二维码"
          >
            {getFieldDecorator('twoDimensionCode', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [{required: false, message: '请上传二维码图片'}],
            })(
              <Avatar onChange={(e) => {
              }}/>
            )}
          </FormItem>

          <FormItem
            wrapperCol={{span: 12, offset: 6}}
          >
            <Button type="primary" loading={loading} htmlType="submit" className={styles.btn}>保存</Button>
            <Button type="primary" htmlType="reset" className={styles.btn}>取消</Button>
            <Button type="primary" onClick={this.handleDelete}
                    className={this.props.deleteStatus == 'none' ? styles.btnNone : styles.btn}>删除</Button>
          </FormItem>
        </div>
      </Form>
    );
  }
}

const UserDetailsFrom = Form.create()(UserDetailsFromImp);
