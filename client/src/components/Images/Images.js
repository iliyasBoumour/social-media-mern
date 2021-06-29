import React from 'react';
import tileData from '../../data/tileData';
import { GridListTile, GridList, Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import '../../App.css';
const Images = (props) => {
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
  };
  return (
    <div>
      <center>
        <Grid item xs={8} sm={12} className='gridList'>
          <Paper elevation={1} className='paper'>
            <Grid container>
              <Grid item className='gridList1'>
                <h1>Photos</h1>
              </Grid>
              <Grid item xs={12} />
              <div className='root'>
                <GridList
                  cellHeight={220}
                  className='gridList'
                  cols={getGridListCols()}>
                  {tileData.map((tile) => (
                    <GridListTile key={tile.img}>
                      <img src={tile.img} alt={tile.title} />
                    </GridListTile>
                  ))}
                </GridList>
              </div>
            </Grid>
          </Paper>
        </Grid>
      </center>
    </div>
  );
};
export default withWidth()(Images);
