import React from 'react';
import {Divider} from 'antd';
import {Link} from 'dva/router';
import styles from './BaseLayouts.less';
import PageHeader from '../components/PageHeader';
import Tree from '../components/TreePage';

export default class BaseLayouts extends React.PureComponent {

  render() {
    //定义传递过来的主界面
    const {children, treeData, loadData, onSelect, leftPage, ...restProps} = this.props;

    return (

      <div className={styles.content}>

        <PageHeader key="pageheader" {...restProps} linkElement={Link}/>
        <div className={styles.treeLayout}>
          {treeData ? <Tree treeData={treeData} loadData={loadData} onSelect={onSelect}/> : leftPage ? leftPage : null}
        </div>
        <div className={styles.divider}>
          <Divider style={{height: '100%'}} type='vertical'/>
        </div>
        <div className={styles.contentLayout}>
          {children ? children : <div>没有子界面</div>}
        </div>
      </div>
    );
  }
}
