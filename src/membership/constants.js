import { Map } from 'immutable'

export const fields = [
  'membership', 'legal_name', 'email', 'public_first_name', 'public_last_name',
  'country', 'state', 'city', 'paper_pubs'
]

export const membershipTypes = [ 'NonMember', 'Exhibitor', 'Supporter', 'Backer', 'Voter', 'Friend', 'Infant', 'Child', 'YoungAdult', 'FirstWorldcon', 'Adult' ]

export const emptyPaperPubsMap = Map({ name: '', address: '', country: '' })

export const isWSFSMember = (member) => {
  const types = ['Supporter', 'Voter', 'YoungAdult', 'FirstWorldcon', 'Adult']
  const membership = typeof member === 'string' ? member : member.get('membership')
  return types.indexOf(membership) !== -1
}
