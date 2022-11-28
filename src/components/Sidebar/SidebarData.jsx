import React from 'react';
import * as CiIcons from 'react-icons/ci';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from  'react-icons/fi';
import * as BiIcons from  'react-icons/bi';
import * as MdIcons from  'react-icons/md';
export const SidebarData = [
  

  {
    title: 'AdminPanel',
    path: '/AdminPanel',
    icon: <RiIcons.RiAdminLine />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/Users',
        icon: <FiIcons.FiUsers />
      },
      {
        title: 'Products',
        path: '/Products',
        icon: <CiIcons.CiShoppingTag />
      },
      {
        title: 'Bills',
        path: '/Bills',
        icon: <RiIcons.RiBillLine />
      },
      
       {
          title: 'Categories',
          path: '/Categories',
          icon: <BiIcons.BiCategoryAlt />,
        },
      
    ]
  },
  {
    title: 'Sales',
    path: '/Sales',
    icon: <BiIcons.BiDrink />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

 
  },
  {
    title: 'Payment',
    path: '/Payment',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Entry',
    path: '/Entry',
    icon: <MdIcons.MdQrCodeScanner />
  },
  
];
