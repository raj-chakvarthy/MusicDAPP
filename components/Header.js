import React from'react';
import {Menu, Divider} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
  return (
    <Menu style={{marginTop: '20px'}}>
      <Link route="/">
        <a className="item">musicDAPP</a>
      </Link>
      <Menu.Menu position ="right">
        
        <Link route="/">
          <a className="item">Concerts</a>
        </Link>
        <Link route="/concerts/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>




    </Menu>

  );
};
