import Money from './money'

namespace OpenBanking {
  export type Status = 'initial' | 'first-sync' | 'active' | 'sync' | 'failed'

  export type StatusInfo = {
    status: Status
    date: Date
  }
}
export default OpenBanking
