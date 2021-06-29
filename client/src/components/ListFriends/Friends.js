import React from 'react';
import tileData from '../../data/tileData';
import { GridListTile,GridList, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import "../../App.css"
const Friends = (props) => {
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 3;
    }

    if (isWidthUp('lg', props.width)) {
      return 3;
    }
    if (isWidthUp('md', props.width)) {
      return 2;
    }
    return 1;
  }
  return (
    <div>
      <center>
      <Grid item xs={8} sm={12} className="gridList">
      <Paper elevation={1} className="paper">
      <Grid container >
      <Grid item className="gridList1">
        <h1>Friends</h1>
        </Grid>
        <Grid item xs={12} />
      <div className="root">
    <GridList cellHeight={100} className="gridList"  cols={getGridListCols()}  >
        {tileData.map((tile) => (
          <GridListTile key={tile.img} className="bouzzit">
            <center>
            <Box display="flex" p={1} bgcolor="background.paper" className="gridd">  
            <Avatar alt="Cindy Baker" src={tile.img} />
            <h1>abderrahmane bouzzit </h1>
            <Checkbox disabled checked style ={{color: "#ab987a", position: "sticky",left: 380,}}  ainputProps={{ 'aria-label': 'disabled checked checkbox' }} />
            </Box>
            </center>
             </GridListTile>
        ))}
      </GridList >
      </div>
      </Grid>
      </Paper>
      </Grid>
      </center>
      </div>
     );
}
export default withWidth()(Friends);