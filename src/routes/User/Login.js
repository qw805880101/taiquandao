import React, {Component} from 'react';
import {connect} from 'dva';
import {Checkbox, Alert} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Submit} = Login;


@connect(({global, login, loading}) => ({
  global,
  login,  //返回参数
  submitting: loading.effects['login/login'], //加载状态
}))

export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({type});
  }

  handleSubmit = (err, values) => {
    const {type} = this.state;
    if (!err) {
      this.props.dispatch({ //发起请求
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{marginBottom: 24}} message={content} type="error" showIcon/>
    );
  }

  render() {
    const {global, login, submitting} = this.props;
    sessionStorage.token = global.token;
    const {type} = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            {
              login.loginData.code != '200' &&
              login.loginData.code != null &&
              !login.submitting &&
              this.renderMessage(login.loginData.message)
            }
            {
              login.loginData.result != null &&
              login.loginData.result.code != '0000' &&
              login.loginData.result.code != null &&
              !login.submitting &&
              this.renderMessage(login.loginData.result.message)
            }
            <UserName name="Mobile" placeholder="admin/user"/>
            <Password name="Password" placeholder="888888/123456"/>
          </Tab>
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
