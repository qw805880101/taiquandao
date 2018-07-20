import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Route, Redirect, Switch, routerRedux} from 'dva/router';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import {enquireScreen} from 'enquire-js';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import {getRoutes} from '../utils/utils';
import Authorized from '../utils/Authorized';
import {getMenuData} from '../common/menu';
import MenuData from '../routes/Menu/Menu';
import logo from '../assets/logo.svg';

const {Content, Header, Footer} = Layout;
const {AuthorizedRoute} = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};

getMenuData().forEach(getRedirect);

const currentUser = {
  name: '测试',
  avatar: 'http://cdnq.duitang.com/uploads/item/201504/04/20150404H3338_N8Wir.jpeg',
};

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  }
  state = {};

  getChildContext() {
    const {location, routerData} = this.props;
    return {
      location,
      breadcrumbNameMap: routerData,
    };
  }

  handleMenuCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }

  handleMenuClick = ({key}) => {
    console.log("key:" + key);
    // if (key === 'userManage/userList') {
    //   this.props.dispatch(routerRedux.push('/userManage/userList/userList'));
    // }
    // if (key === 'agencyManage/agencyList') {
    //   this.props.dispatch(routerRedux.push('/agencyManage/agencyList/agencyList'));
    // }
    if (key === 'logout') {
      // this.props.dispatch({
      //   type: 'login/logout',
      // });
      this.props.dispatch(routerRedux.push('/user'));
    }
  }

  getPageTitle() {
    const {routerData, location} = this.props;
    const {pathname} = location;
    let title = '管理平台';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 管理平台`;
    }
    return title;
  }

  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/index';
    }
    return redirect;
  }

  render() {
    const {
      collapsed, routerData, match, location, menus
    } = this.props;

    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          //本地
          menuData={getMenuData()}
          collapsed={collapsed}
          onCollapse={this.handleMenuCollapse}
          onMenuClick={this.handleMenuClick}
          location={location}
        />
        <Layout>
          <Header style={{padding: 0}}>
            <GlobalHeader
              currentUser={{
                name: sessionStorage.userName,
                avatar: sessionStorage.headPic,
              }}
              logo={logo}
              collapsed={collapsed}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
            />
          </Header>
          <Content style={{margin: '24px 0 0 24px', height: '100%', overflow: 'hidden'}}>
            <Switch>
              {
                redirectData.map(item =>
                  <Redirect key={item.from} exact from={item.from} to={item.to}/>
                )
              }
              {
                getRoutes(match.path, routerData).map(item =>
                  (
                    <AuthorizedRoute
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      authority={item.authority}
                      redirectPath="/exception/403"
                    />
                  )
                )
              }
              <Redirect exact from="/" to={bashRedirect}/>
              <Route render={NotFound}/>
            </Switch>
          </Content>
          <Footer style={{padding: 0}}>
            <GlobalFooter
              copyright={
                <Fragment>
                  Copyright <Icon type="copyright"/> 2018 上海翰迪数据服务有限公司 技术部出品
                </Fragment>
              }
            />
          </Footer>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({user, global, loading}) => ({
  collapsed: global.collapsed,
  menus: global.menus,
}))(BasicLayout);
