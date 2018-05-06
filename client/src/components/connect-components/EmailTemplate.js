import React from 'react';
import '../../css/Connect.css';

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

/* props:
 *    ...state (input fields)
 *    saveContent(content, tempID): callback
 *    sendEmail: callback
 *    chooseTemplate(tempID): callback
 *    setDefaultTemplate(): callback
 *    setNewTemplate(tempID, template): callback
 *    deleteTemplate(tempID): callback
*/
class EmailTemplate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      templates: this.props.templates,
      curTempID: this.props.curTempID,
      content: this.props.content,
      name: this.props.curTempName,
      readOnly: this.props.readOnly,
    };

    this.toggleEditor = this.toggleEditor.bind(this);
    this.saveContent = this.saveContent.bind(this);
    this.makeNewTemplate = this.makeNewTemplate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  if (nextProps.curTempName !== this.state.name) {
    this.setState({ name: nextProps.curTempName });
  }
}

  toggleEditor() {
    if (this.state.readOnly) {
      this.setState({ content: this.props.content });
    }
    this.setState({ readOnly: !this.state.readOnly });
  }

  saveContent() {
    this.props.saveContent(this.state.content, this.state.curTempID, this.state.name);
    this.setState({ readOnly: !this.state.readOnly });
  }

  makeNewTemplate() {
    const tempID = Date.now();
    const numTemps = Object.keys(this.props.templates).length;
    const newTemp = {
      name: `Template ${numTemps+1}`,
      content: 'Write your email template here',
      subject: '',
      position: '',
    }
    let templates = this.state.templates;
    templates[tempID] = newTemp;
    this.setState({
      templates: templates,
      curTempID: tempID,
      name: newTemp.name,
    }, this.props.setNewTemplate(tempID, newTemp));
  }

  render() {
    let buttons;
    if (this.state.readOnly) {
      const disabled = this.props.email && this.props.password ? false : true;
      buttons = (
        <div id="templateButtons">
          <button disabled={disabled} type="button" className="btn btn-success btn-sm" onClick={() => this.props.sendEmail(replaceContent(this.props))}>
            Send Email
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={this.toggleEditor}>
            Edit
          </button>
          <div className="dropdown dropleft">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My Templates
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {Object.keys(this.props.templates).map(function(id) {
                const tempID = parseInt(id, 10);
                const cur = tempID === this.props.curTempID ? 'selected-temp' : '';
                const defaultIcon = tempID === this.props.defaultID ? <span className="temp-icon"><i className="far fa-star"></i></span> : '';
                return (
                  <a className={`dropdown-item ${cur}`} key={tempID} role="button" tabIndex="0" onClick={() => this.props.chooseTemplate(tempID)}>
                    {this.props.templates[tempID].name}
                    {defaultIcon}
                  </a>
                );
              }, this)}
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" role="button" tabIndex="0" onClick={() => this.makeNewTemplate()}>
                <strong>New Template</strong>
              </a>
            </div>
          </div>
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

    const templateName = (this.state.readOnly) ? (
      <label id="templateLabel" htmlFor="emailTemplate">
        <strong>{this.state.name}</strong>
        <span onClick={() => this.props.deleteTemplate()}><i className="fas fa-trash-alt" /></span>
        <a role="button" tabIndex="0" onClick={() => this.props.setDefaultTemplate()}>Make Default</a>
      </label>
    ) : (
      <label id="templateLabel" htmlFor="emailTemplate">
        <span>
          <input
            type="text"
            className="form-control"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            style={{ width: '50%' }}
          />
        </span>
      </label>
    )

    return (
      <div className="form-group email-temp">
        {templateName}
        <div style={{ height: '100%' }}>
          {input}
          {buttons}
        </div>
      </div>
    );
  }
}

export default EmailTemplate;
