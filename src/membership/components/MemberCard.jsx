import React from 'react'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import ContentCreate from 'material-ui/svg-icons/content/create'
import Palette from 'material-ui/svg-icons/image/palette'
import LocationCity from 'material-ui/svg-icons/social/location-city'
const ImmutablePropTypes = require('react-immutable-proptypes')

import Rocket from '../../lib/rocket-icon'
import { isWSFSMember } from '../constants'
import MemberEdit from './MemberEdit'

const location = (member) => (
  [member.get('city'), member.get('state'), member.get('country')]
  .filter(n => n)
  .join(', ')
  .trim()
);

const publicName = (member) => (
  [member.get('public_first_name'), member.get('public_last_name')]
    .filter(n => n)
    .join(' ')
    .trim()
);

const memberActions = (member, push, showHugoActions) => {
  const id = member.get('id')
  const infoStyle = { color: 'rgba(0, 0, 0, 0.870588)' }
  const actions = [
    <MemberEdit member={member}>
      <ListItem
        key="ed"
        innerDivStyle={{ paddingLeft: 60 }}
        leftIcon={<ContentCreate style={{ top: 12 }}/>}
        primaryText="Edit personal information"
        secondaryText={<p>
          Public name: <span style={infoStyle}>{publicName(member) || '[not set]'}</span><br/>
          Location: <span style={infoStyle}>{location(member) || '[not set]'}</span>
        </p>}
        secondaryTextLines={2}
      />
    </MemberEdit>,
    <ListItem
      key="up"
      innerDivStyle={{ paddingLeft: 60 }}
      leftIcon={<ThumbUp style={{ top: 12 }}/>}
      onTouchTap={() => push(`/upgrade/${id}`)}
      primaryText="Upgrade membership"
      secondaryText="and/or add paper publications"
    />
  ]
  if (showHugoActions && member.get('can_hugo_vote')) actions.push(
    <ListItem
      key="hv"
      innerDivStyle={{ paddingLeft: 60 }}
      leftIcon={<Rocket />}
      onTouchTap={() => push(`/hugo/${id}/vote`)}
      primaryText="Vote for the Hugo Awards"
    />
  )
  if (showHugoActions && member.get('can_hugo_nominate')) actions.push(
    <ListItem
      key="hn"
      innerDivStyle={{ paddingLeft: 60 }}
      leftIcon={<Rocket />}
      onTouchTap={() => push(`/hugo/${id}/nominate`)}
      primaryText="Nominate for the Hugo Awards"
    />
  )
  if (isWSFSMember(member)) actions.push(
    <ListItem
      key="ss"
      innerDivStyle={{ paddingLeft: 60 }}
      leftIcon={<LocationCity />}
      onTouchTap={() => push(`/pay/ss-token`)}
      primaryText="Buy a site selection token"
    />,
    <ListItem
      key="as"
      innerDivStyle={{ paddingLeft: 60 }}
      leftIcon={<Palette />}
      onTouchTap={ () => push(`/exhibition/${id}`) }
      primaryText="Register for the Art Show"
    />
  )
  return actions
}

const Member = ({ member, push, showHugoActions }) => {
  if (!member) return null
  const membership = member.get('membership', 'NonMember')

  return <Card style={{ marginBottom: 18 }}>
    <CardHeader
      title={ member.get('legal_name') }
      style={{ fontWeight: 600 }}
      subtitle={ membership === 'NonMember'
          ? 'Non-member' + (member.get('can_hugo_nominate') ? ' (Hugo nominator)' : '')
          : `${membership} member #${member.get('member_number')}` }
    />
    <CardActions style={{ marginLeft: 8, paddingTop: 0 }}>
      <List style={{ paddingTop: 0 }}>
        {memberActions(member, push, showHugoActions)}
      </List>
    </CardActions>
  </Card>
}

Member.propTypes = {
  member: ImmutablePropTypes.mapContains({
    paper_pubs: ImmutablePropTypes.map
  }),
  push: React.PropTypes.func.isRequired,
  showHugoActions: React.PropTypes.bool
}

export default Member
