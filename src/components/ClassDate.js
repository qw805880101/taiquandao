import React from 'react';
import {Link} from 'dva/router';
import {Button, Form, Input, Select, TimePicker} from 'antd';

export default class UserDisplay extends React.PureComponent {

  render() {
    return (
      <div style={{width: '100%'}}>
        <Select style={{width: '30%'}} placeholder="请选择日期">
          {agencyTreeData(dateData)}
        </Select>

        <Select style={{width: '30%', marginLeft: '5%'}} placeholder="请选择开始时间">
          {agencyTreeData(dateData)}
        </Select>

        <Select style={{width: '30%', marginLeft: '5%'}} placeholder="请选择结束时间">
          {agencyTreeData(dateData)}
        </Select>
      </div>
    );
  }
}
