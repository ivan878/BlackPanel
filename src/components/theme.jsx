import React from 'react';
import {SunOutlined,MoonOutlined,MinusCircleOutlined} from '@ant-design/icons';
import { Button} from 'antd';

function Themechange  ({darktheme, toggletheme}) {
  
  return (
    <div className="toggle">
         <Button type="primary" icon={<MinusCircleOutlined />}  onClick={toggletheme}>
            {darktheme ?   <MoonOutlined /> :  <SunOutlined />}
         </Button>
    </div>
  );
};
export default Themechange;
