import React from 'react';
import '../../css/Discover.css';

const replaceContent = (props) => {
  let content = props.content;
  const f_name = props.name.split(' ')[0];
  const l_name = props.name.split(' ')[1];
  const config = {
    f_name: '$FIRSTNAME',
    l_name: '$LASTNAME',
    company: '$COMPANY',
    position: '$POSITION',
    city: '$CITY',
  };

  for (const id in config) {
    const re = new RegExp(`\\${config[id]}`, 'g');
    if (id === 'f_name' && f_name) {
      content = content.replace(re, f_name);
    } else if (id === 'l_name' && l_name) {
      content = content.replace(re, l_name);
    } else if (props[id]) {
      content = content.replace(re, props[id]);
    }
  }

  return content;
};

class EmailTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.toggleEditor = this.toggleEditor.bind(this);
    this.saveContent = this.saveContent.bind(this);

    this.state = {
      content: props.content,
      readOnly: props.readOnly,
    };
  }

  toggleEditor() {
    if (this.state.readOnly) {
      this.setState({ content: this.props.content });
    }

    this.setState({ readOnly: !this.state.readOnly });
  }

  saveContent() {
    this.props.saveContent(this.state.content);
    this.setState({ readOnly: !this.state.readOnly });
  }

  render() {
    let buttons;
    if (this.state.readOnly) {
      buttons = (
        <div id="templateButtons">
          <button type="button" className="btn btn-success btn-sm" onClick={() => this.props.sendEmail(replaceContent(this.props))}>
            Send Email
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.toggleEditor}>
            Edit
          </button>
        </div>
      );
    } else {
      buttons = (
        <span id="emailButtons">
          <button type="button" className="btn btn-success btn-sm" onClick={this.saveContent}>
            Save
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={this.toggleEditor}>
            Cancel
          </button>
        </span>
      );
    }

    let input;
    if (this.state.readOnly) {
      input = (
        <textarea
          className="form-control email editor"
          id="emailTemplate"
          value={replaceContent(this.props)}
          readOnly
        />
      );
    } else {
      input = (
        <textarea
          className="form-control email editor"
          id="emailTemplate"
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      );
    }

    return (
      <div style={{ height: '100%' }}>
        {input}
        {buttons}
      </div>
    );
  }
}

export default EmailTemplate;
