import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Divider } from '@mui/material';

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

export default function BelowNav() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/', '/find-cars', '/trip', '/profile']);
    const currentTab = routeMatch?.pattern?.path;

    return (
      <div className='md:hidden'>
        {/* <Divider></Divider> */}
          <Tabs sx={{ boxShadow: 3, backgroundColor: '#f7f7f7' }} centered={true}  allowScrollButtonsMobile={true}  scrollButtons={true} className='flex justify-between bottom-0 z-20 mx-auto fixed w-[100vw] overflow-x-scroll border' value={currentTab} aria-label="basic tabs example" >
            <Tab to="/" value={`/`} component={Link} style={{ fontSize: '10px' }} className='normal-case' icon={<HouseOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></HouseOutlinedIcon>} disableRipple label="Home" />
            <Tab to="/find-cars" value={`/find-cars`} component={Link} style={{ fontSize: '10px' }} className='normal-case' icon={<SearchOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} fontSize="medium"></SearchOutlinedIcon>} disableRipple label="Find" />
            <Tab to="/trip" value={`/trip`} component={Link} style={{ fontSize: '10px' }} className='normal-case' icon={<TimeToLeaveOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} ffontSize="medium"></TimeToLeaveOutlinedIcon>} disableRipple label="Trip" />
            <Tab to="/profile" value={`/profile`} component={Link} style={{ fontSize: '10px' }} className='normal-case' icon={<AccountCircleOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 1 }} ffontSize="medium"></AccountCircleOutlinedIcon>} disableRipple label="Profile" />
        </Tabs>
      </div>
    );
}

