import React from 'react';

const Error = (props) => {
  return (
    <div>
      <h1>Error!</h1>
      <h3>Couldn't find any photos here.</h3>

      <p>Here's the full error, for debugging purposes:</p>
      <pre>{ props.error }</pre>
    </div>
  );
};

export default Error;
