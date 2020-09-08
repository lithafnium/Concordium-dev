import React, { useState, useEffect } from 'react';
import {
  Grommet, Box, Button, Heading, Paragraph, Text,
} from 'grommet';
import moment from 'moment';

const CallCard = (props) => {
  const {
    name, school, age, time, interests, picUrl, callUrl,
  } = props;


  const [isEnabled, setIsEnabled] = useState(true);

  // returns data object


  const handleJoinCall = () => {
    // TODO: call endpoint to delete match
  };


  console.log(isEnabled);
  return (
    <Box
      align="center"
      onClick={() => console.log('add modal')}
      pad="small"
      background={{
        0: 'b',
        1: 'r',
        2: 'a',
        3: 'n',
        4: 'd',
        color: 'white',
        position: 'bottom',
      }}
      round="medium"
      elevation="xlarge"
      margin="medium"
      direction="column"
      alignSelf="center"
      animation={{ type: 'fadeIn', size: 'medium' }}
    >
      <Box
        align="start"
        justify="start"
        pad="small"
        direction="row"
        alignSelf="start"
      />
      <Box
        align="center"
        justify="center"
        pad="large"
        margin="medium"
        background={
          picUrl !== '/placeholder.png'
            ? {
              dark: false,
              color: 'light-2',
              image:
        `url(${picUrl})`,
            }: {
              dark: false,
              color: 'light-2',
              image:
        'url(https://theconcordium.org/images/placeholder.png)',
            } 
      }
      />
      <Box align="center" justify="center" pad="xsmall" margin="xsmall">
        <Heading level="2" size="medium" margin="xsmall" textAlign="center">
          {name}
        </Heading>
        <Text textAlign="center">{school}</Text>
        <Text textAlign="center">
          {`Call Time: 
        ${time}
        `}
        </Text>
        <Box
          align="center"
          justify="center"
          pad="small"
          direction="row-responsive"
          flex
          alignSelf="center"
          basis="xxsmall"
          gap="small"
          margin="xsmall"
        >
          <Button disabled={!isEnabled} label="Join Call" onClick={() => window.open(`https://${callUrl}`)} primary plain={false} />
        </Box>
        <Paragraph size="small" margin="medium" textAlign="center">
          Interests:
          {' '}
          {interests}
          <br />
          Age:
          {' '}
          {age}
          <br />
          Topics:
          {' '}
          {props.topics}
        </Paragraph>
      </Box>
    </Box>
  );
};

export default CallCard;
