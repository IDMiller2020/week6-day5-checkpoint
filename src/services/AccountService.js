import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
      console.log('res.data in getAccount')
      console.log(res.data)
      console.log('res.data.id in getAccount')
      console.log(res.data.id)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getProfile(id) {
    console.log('AccountService.js getProfile(id)')
    console.log(id)
    try {
      const res = await api.get('api/profiles/' + id)
      AppState.activeProfile = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
}

export const accountService = new AccountService()
