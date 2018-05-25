import React from 'react';
import {Layout, Menu, Icon, Tree, Row, Col, Divider} from 'antd';
import {Link} from 'dva/router';
import styles from './BaseLayouts.less';
import logo from '../assets/logo.svg';

const {Header, Sider, Content} = Layout;

const TreeNode = Tree.TreeNode;
const SubMenu = Menu.SubMenu;

const gData = [{
  title: '父级0',
  key: '0-0',
  children: [{
    title: '子集0',
    key: '0-0-1',
    children: [{
      title: '孙集0',
      key: '0-0-1-1',
    }]
  }, {
    title: '子集1',
    key: '0-2-1',
  }, {
    title: '子集2',
    key: '0-3-1',
  }],
}, {
  title: '父级0',
  key: '1-0',
  children: [{
    title: '子集0',
    key: '1-0-1',
    children: [{
      title: '孙集0',
      key: '1-0-1-1',
    }]
  }, {
    title: '子集1',
    key: '1-2-1',
  }, {
    title: '子集2',
    key: '1-3-1',
  }],
}];

export default class test extends React.PureComponent {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  test(array) {
    for (var i = 0; i < array.length; i++) {
      console.log(array[i].title);
      return <TreeNode
        title={array[i].title}
        key={array[i].key}
      />;
    }
  }

  handleMenuClick = ({key}) => {
    console.log("key:" + key);
  }

  render() {

    const loop = data => data.map((item) => {
      if (item.children) {
        return (
          <TreeNode key={item.key} title={item.title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={item.title}/>;
    });

    return (
      <Layout style={{height: '100%'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          width={256}
        >
          <div className={styles.logo} key="logo">
            <Link to="/">
              <img src={logo} alt="logo"/>
            </Link>
          </div>
          <Menu style={{padding: '16px 0', width: '100%'}} theme="dark" mode="inline" defaultSelectedKeys={['1']}
                onClick={this.handleMenuClick}>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>} onTitleClick={this.handleMenuClick}>
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <Menu.Item key="2">
              <Icon type="video-camera"/>
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload"/>
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content className={styles.content}>
            <Row gutter={16} align="middle" className={styles.rom}>
              <Col className={styles.treeLayout}>
                <Tree
                  defaultExpandedKeys={['0']}
                  onSelect={this.onSelect}>
                  {loop(gData)}
                </Tree>
              </Col>

              {/*<Divider*/}
              {/*type="vertical"*/}
              {/*>123</Divider>*/}

              <Col className={styles.contentLayout}>col-12</Col>

            </Row>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
