import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
function Layout({children}) {
  const [collapsed, setCollapsed] = useState(false);
  const {user} =useSelector((state) => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const location = useLocation()
    const userMenu =[{
        name: 'Home',
        path: '/',
        icon: 'ri-home-line'
    },
    {
        name: 'Appointments',
        path: '/appointments',
        icon: 'ri-file-list-line'
    },
    {
        name: 'Apply Docter',
        path: '/apply-doctor',
        icon: 'ri-file-list-line'
    },
    {
        name: 'Profile',
        path: '/profile',
        icon: 'ri-user-line'
    },
  ];

    const adminMenu =[{
    name: 'Home',
    path: '/',
    icon: 'ri-home-line'
  },
  {
    name: 'users',
    path: '/users',
    icon: 'ri-home-line',

  },
  {
    name: 'Docters',
    path: '/doctors',
    icon: 'ri-user-star-line'
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: 'ri-user-line'
  },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu :userMenu;

  return (
    <div className='main'>
      <div className='d-flex layout'>
        <div className='sidebar'>
          <div className='sidebar-header'>
            <h1 className='logo'>DA</h1>
          </div>
          <div className='menu'>
            {menuToBeRendered.map((menu) => {
                const isActive = location.pathname === menu.path
              return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                <i className={menu.icon}></i>
                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
            })}
            <div className={'d-flex menu-item'} onClick={() =>{
              localStorage.clear()
              navigate('/login')
            }} >
                <i className='ri-logout-box-r-line'></i>
                {!collapsed && <Link to='/login'>Log Out</Link>}
                </div>
          </div>
        </div>

        <div className='content'>
            <div className='header'>
            {collapsed ? (
              <i className="ri-menu-line header-action-icon" onClick={()=>setCollapsed(false)}> </i> 
              ):(
                <i className="ri-close-fill header-action-icon" onClick={()=>setCollapsed(true)}></i>
              )
            }
            

            <div className='d-flex align-items-center px-4'>
            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
              <i className="ri-message-line header-action-icon px-3"></i><i className="ri-notification-line header-action-icon px-3"></i>
             </Badge>
            
            <Link className='anchor mx-3' to='/profile' >{user?.name}</Link>
            </div>
            </div>
            

            <div className='body'>
                {children}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Layout