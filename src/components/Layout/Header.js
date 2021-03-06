import React, { useState } from 'react';
import { 
  fade, 
  makeStyles 
} from '@material-ui/core/styles';

import { history } from '../../App';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Link
} from '@material-ui/core';

import { 
  useSelector, 
} from 'react-redux';

import UserOptionsCard from '../Cards/UserOptionsCard';

import {
  MoreVert as MoreIcon,
  VpnKey as VpnKeyIcon,
  AddBoxOutlined as AddBoxOutlinedIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '33%',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const userState = useSelector((state) => state);

  // const preventDefault = (event) => event.preventDefault();
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push('/create')}>
        <IconButton aria-label="Add New Article" color="inherit">
          <AddBoxOutlinedIcon />
        </IconButton>
        <p>Add Article</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="Log In" color="inherit">
          <VpnKeyIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>

      {/* <MenuItem>
        <IconButton aria-label="Log Out" color="inherit">
          <VpnKeyIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem> */}
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ marginBottom: '32px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            <Link onClick={() => history.push("/")} color="inherit">
              <b>Home</b>
            </Link>
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button 
              color="inherit" 
              style={{ fontWeight: 600 }}
              onClick={() => history.push('/create')}
            >
              ADD ARTICLE
            </Button>
            { !userState.authData.auth ? (
              <Button
                color="inherit"
                style={{ fontWeight: 600 }}
                onClick={() => history.push('/login')}
              >
                Login
              </Button>
            
            ) : (
              <UserOptionsCard username={userState?.authData?.user?.user_id} history={history} />
            )}
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default Header;
