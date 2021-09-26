import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { TopTab } from '../TopTab';
import MoviesByGenre from '../GenresTab/MoviesByGenre';
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
            indicatorColor="secondary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="ホーム" {...a11yProps(0)} />
            <Tab label="高評価" {...a11yProps(1)} />
            <Tab label="上映予定" {...a11yProps(2)} />
            <Tab label="上映中" {...a11yProps(3)} />
            <Tab label="アクション" {...a11yProps(4)} />
            <Tab label="コメディー" {...a11yProps(5)} />
            <Tab label="ロマンス" {...a11yProps(6)} />
            <Tab label="ホラー" {...a11yProps(7)} />
            <Tab label="ミステリー" {...a11yProps(8)} />
            <Tab label="クライムサスペンス" {...a11yProps(9)} />
            <Tab label="SF" {...a11yProps(10)} />
            <Tab label="アニメ" {...a11yProps(11)} />
            <Tab label="戦争" {...a11yProps(12)} />
            <Tab label="ミュージック" {...a11yProps(13)} />
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
          <MoviesByGenre genreId={28} pageName={'アクション'} />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <MoviesByGenre genreId={35} pageName={'コメディー'} />
        </TabPanel>
        <TabPanel value={value} index={6}>
        < MoviesByGenre genreId={10749} pageName={'ロマンス'} />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <MoviesByGenre genreId={27} pageName={'ホラー'} />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <MoviesByGenre genreId={9648} pageName={'ミステリー'} />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <MoviesByGenre genreId={80} pageName={'クライムサスペンス'} />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <MoviesByGenre genreId={878} pageName={'SF'} />
        </TabPanel>
        <TabPanel value={value} index={11}>
          <MoviesByGenre genreId={16} pageName={'アニメ'} />
        </TabPanel>
        <TabPanel value={value} index={12}>
          <MoviesByGenre genreId={10752} pageName={'戦争'} />
        </TabPanel>
        <TabPanel value={value} index={13}>
          <MoviesByGenre genreId={10402} pageName={'ミュージック'} />
        </TabPanel>
      </div>
    </Wrapper>
  );
}
