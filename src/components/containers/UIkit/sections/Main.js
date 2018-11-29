import React from 'react';
import ColorPalete from './blocks/ColorPalete';
import Typography from './blocks/Typography';
import Components from './blocks/Components';
import Grid from './blocks/Grid';
import Blocks from './blocks/Blocks';

/**
 * This component returns content of UIkit page
 *
 * @return {XML}
 * @constructor
 */
const Main = () => {
  return (
    <div className="ui-main">
      <div className="ui-content">
        <ColorPalete />
        <Typography />
        <Components />
        <Grid />
        <Blocks />
      </div>
    </div>
  );
};

export default Main;
