import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { BsBookmarkCheck } from 'react-icons/bs'
import { RiChatHeartLine } from 'react-icons/ri'
import { ImEyePlus } from 'react-icons/im'
import { BsPersonCheck } from 'react-icons/bs'

import './UserPageTab.css'
import { MyListTabs } from '../MyListTabs';
import { Wrapper } from '../Nav/Nav.styles';
import { FavActor } from '../FavActor';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <h1>{children}</h1>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <div className={classes.root}>
        <AppBar position="static"  color="inherit">
          <Tabs
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            <LinkTab label={<BsBookmarkCheck size="21px" />} href="/drafts" {...a11yProps(0)} />
            <LinkTab label={<RiChatHeartLine size="24px" />} href="/trash" {...a11yProps(1)} />
            <LinkTab label={<ImEyePlus size="24px" />} href="/spam" {...a11yProps(2)} />
            <LinkTab label={<BsPersonCheck size="24px" />} href="/spam" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <div className="tab-panels">
          <TabPanel value={value} index={0}>
            <MyListTabs colName={'watched'} header={'視聴済み'} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyListTabs colName={'fav'} header={'スキ'} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <MyListTabs colName={'wish'} header={'観たい'} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <FavActor colName={'actors'} header={'人物'} />
          </TabPanel>
        </div>
      </div>
    </Wrapper>
  );
}
