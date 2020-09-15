import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';

import { FaUserEdit } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

import { useDispatch } from 'react-redux';

import { logout } from '../../redux/actions/authActions';
import { LOGGED_OUT } from '../../redux/actions/types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(1),
  }
}));

const UserOptionsCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();

  const { username, history } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          startIcon={< AccountCircle />}
          color="inherit"
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{ fontWeight: '600' }}
        >
          {username}
        </Button>
        <Popper open={open} className={classes.paper} anchorEl={anchorRef.current} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={e => { handleClose(e); history.push(`/users/${username}`) }}><FaUserEdit className={classes.icon}/>Profile</MenuItem>
                    <MenuItem onClick={e => { 
                      handleClose(e); 
                      logout();
                      dispatch({
                        type: LOGGED_OUT
                      });
                      history.push('/')}
                    }>
                      <FiLogIn className={classes.icon}/>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default UserOptionsCard;