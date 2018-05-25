import React from 'react';
import {connect} from "dva";
import {Spin} from "antd";

const Menu = (WrappedComponent) => {
  @connect((state, global, loading) => ({
        global: state.global,
        // menus: loading.effects['global/fetchMenus'],
      }
    )
  )
  class Menu extends React.Component {
    componentDidMount() {
      this.props.dispatch({
        type: 'global/fetchMenus',
        payload: {
          "actNo": "A8001",
          "userId": sessionStorage.userId,
        },
      })
    }

    render() {
      const menus = this.props.global.menus;

      if (!menus == undefined) {
        return (
          menus.length === 0 ? <Spin spinning={true}/> :
            <WrappedComponent {...this.props} menus={menus}/>
        )
      }
      else {
        return (
          <WrappedComponent {...this.props} menus={menus}/>
        )
      }
    }
  }

  return Menu;
};
export default Menu;
