import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

export default function StarRating(props) {
    const [value, setValue] = React.useState(0);
    return (
      <div>
        <Box align="left"  component="fieldset" mb={3} borderColor="transparent">
          <Rating
            value={value}
            name="rating"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onClick={props.handleInputChange}
          />
        </Box>
      </div>
    )
  }