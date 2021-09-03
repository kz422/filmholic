import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { TopTab } from '../TopTab';
import ActionTab from '../GenresTab/Action';
import ComedyTab from '../GenresTab/Comedy';
import RomanceTab from '../GenresTab/Romance';
import HorrorTab from '../GenresTab/Horror';
import MysteryTab from '../GenresTab/Mystery';
import TopRatedTab from '../TopTab/TopRatedTab';
import NowShowingTab from '../TopTab/NowShowing';
import ComingSoonTab from '../TopTab/ComingSoon';
import { Wrapper } from './Nav.styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>

      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Top" {...a11yProps(0)} />
            <Tab label="TopRated" {...a11yProps(1)} />
            <Tab label="Coming Soon" {...a11yProps(2)} />
            <Tab label="Now Showing" {...a11yProps(3)} />
            <Tab label="Action" {...a11yProps(4)} />
            <Tab label="Comedy" {...a11yProps(5)} />
            <Tab label="Romance" {...a11yProps(6)} />
            <Tab label="Horror" {...a11yProps(7)} />
            <Tab label="Mystery" {...a11yProps(8)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <TopTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TopRatedTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComingSoonTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <NowShowingTab />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ActionTab />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ComedyTab />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <RomanceTab />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <HorrorTab />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <MysteryTab />
        </TabPanel>
      </div>
    </Wrapper>
  );
}
