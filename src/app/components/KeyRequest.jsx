import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { keyRequest } from '../actions/auth'

class KeyRequest extends React.Component {

  static propTypes = {
    allowCreate: PropTypes.bool,
    cardStyle: PropTypes.object,
    keyRequest: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    name: ''
  }

  render() {
    const { allowCreate, cardStyle, keyRequest } = this.props;
    const { email, name } = this.state;
    const validEmail = email && /.@.*\../.test(email);

    return <div>
      <Card style={cardStyle}>
        <CardHeader
          title="Request login link"
          style={{ fontWeight: 600 }}
        />
        <CardText style={{ marginTop: -16 }}>
          <div className="html-container">
            <p>
              People that voted in Site Selection in Helsinki or were
              Dublin BID Presupporters / Backers / Friends / Super Friends,
              or are members of Dublin 2019 Worldcon,
              will need to use a login link sent to you via email.
            </p>
            <p>
              To request a new login link, please enter your email address below,
              and it'll be sent to you. The address you enter will
              need to match the one we have in our database for you; it's the one
              that you provided when signing up, and at which you've previously
              received messages from us.
            </p>
            {allowCreate && <p>
              If you don't yet have an account, please enter your name as well,
              and an account will be created for you. You will then receive a
              confirmation email with a link back to this page.
            </p>}
          </div>
          <form onSubmit={() => keyRequest(email, name)}>
            <TextField
              autoFocus={true}
              id="email"
              fullWidth={true}
              floatingLabelText="Email"
              value={email}
              onChange={(_, email) => this.setState({ email })}
            />
            {allowCreate && <TextField
              fullWidth={true}
              floatingLabelText="Name"
              value={name}
              onChange={(_, name) => this.setState({ name })}
            />}
            <RaisedButton
              label={name ? 'Create Account' : 'Send login link'}
              fullWidth={true}
              primary={true}
              disabled={!validEmail}
              style={{ marginTop: 12 }}
              onTouchTap={() => keyRequest(email, name)}
            />
          </form>
        </CardText>
      </Card>
      <div className="bg-text" style={{ fontSize: 14, margin: '12px 0 20px', padding: '2px 16px', color: '#6abd45', backgroundColor: 'rgba(0, 0, 0, 0.67)' }}>
        <p>
          If you're not able to enter a valid address, or if you do not receive
          the login link within 30 minutes or so, please get in touch with us at
          {' '}<a href="mailto:registrar@dublin2019.com">registrar@dublin2019.com</a>{' '}
          and we'll help you get sorted.
        </p><p>
          If your email address is associated with more than one membership that
          is eligible to vote or nominate in the 2019 Hugo Awards, you'll need to
          use the separately emailed Hugo login link to access those services.
          Hugo nominations will open in early 2018.
        </p>
      </div>
    </div>
  }
}

export default connect(null, { keyRequest })(KeyRequest);
