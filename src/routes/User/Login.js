import React, {Component} from 'react';
import {connect} from 'dva';
import {Checkbox, Alert} from 'antd';
import Login from '../../components/Login';
import styles from './Login.less';

const {Tab, UserName, Password, Submit, MerName} = Login;


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
          "appVersion": "1.0.0",
          "timestamp": new Date().getTime(),
          "terminalOs": "H5",
          "actNo": "A1001",
          type,
        },
      });
    }
  }

  /*
  * 打开页面自动调用token接口
  * */
  componentDidMount() {
    this.props.dispatch({
      type: 'global/getToken',
      payload: {
        "username": "11rrr660",
        "password": "255rrr550",
      },
    });
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  renderMessage = (content) => {
    return (
      <Alert style={{marginBottom:24}} message={content} type="error" showIcon/>
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
              this.renderMessage(login.loginData.msg)
            }
            {
              login.loginData.result != null &&
              login.loginData.result.respCode != '0000' &&
              login.loginData.result.respCode != null &&
              !login.submitting &&
              this.renderMessage(login.loginData.result.respMsg)
            }
            <UserName name="userName" placeholder="admin/user"/>
            <Password name="password" placeholder="888888/123456"/>
            <MerName name="merName" placeholder="机构名称"/>
          </Tab>
          {/* <Tab key="mobile" tab="手机号登录"> */}
          {/* { */}
          {/* login.status === 'error' && */}
          {/* login.type === 'mobile' && */}
          {/* !login.submitting && */}
          {/* this.renderMessage('验证码错误') */}
          {/* } */}
          {/* <Mobile name="mobile" /> */}
          {/* <Captcha name="captcha" /> */}
          {/* </Tab> */}
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            {/* <a style={{ float: 'right' }} href="">忘记密码</a> */}
          </div>
          <Submit loading={submitting}>登录</Submit>
          {/* <div className={styles.other}> */}
          {/* 其他登录方式 */}
          {/* <Icon className={styles.icon} type="alipay-circle" /> */}
          {/* <Icon className={styles.icon} type="taobao-circle" /> */}
          {/* <Icon className={styles.icon} type="weibo-circle" /> */}
          {/* <Link className={styles.register} to="/user/register">注册账户</Link> */}
          {/* </div> */}
        </Login>
      </div>
    );
  }
}
