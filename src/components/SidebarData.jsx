import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as FiIcons from 'react-icons/fi';
import * as BiIcons from 'react-icons/bi';

export const SidebarData = [
    {
        title: 'Home',
        path: '/Home',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />    
    },
    
    {
        title: 'Admin Panel',
        path: '/AdminPanel',
        icon: <RiIcons.RiAdminLine />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav:[
        {
            title: 'Users',
            path:'/Users',
            icon:<FiIcons.FiUsers/>
        },
        {
            title:'Register',
            path:'/Register',
            icon:<FiIcons.FiUserPlus/>            
        }
        ]    
    },
    {
        title:'Products/Categories',
        path:'/Products',
        icon:<BiIcons.BiDrink/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },

    {
        title:'Payment',
        path:'/Payment',
        icon:<MdIcons.MdPayment/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },

    {
        title:'Entries',
        path:'/Entry',
        icon:<MdIcons.MdOutlineSecurityUpdateGood/>,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />
    },

]
