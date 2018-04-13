import React from 'react';
import '../../css/Header.css';

/*
 * props: title - the title to display
*/
function MediumHeader(props) {
  return (
    <h2 className="m-header">{props.title}</h2>
  );
}

export default MediumHeader;
