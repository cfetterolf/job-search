import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';

/*
 * props: text - text to display
 * id: id number
*/
class PopoverItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <td style={{ cursor: 'pointer' }}>
        <a role="button" id={'Popover-' + this.props.id} onMouseOver={this.toggle} onMouseOut={this.toggle}>{this.props.text.substring(0,7)+"..."}</a>
        <Popover placement='bottom' isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
          <PopoverBody>{this.props.text}</PopoverBody>
        </Popover>
      </td>
    );
  }
}

export default PopoverItem;
