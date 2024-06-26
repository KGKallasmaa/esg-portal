import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Settings from '../../../models/settings'

async function getMySettings(): Promise<Settings.UserSettings> {
  const path = `v1/settings`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function putUpdateGeneralSettings(
  settings: Settings.General
): Promise<null> {
  const path = `v1/settings`
  const payload = {
    general: settings,
  }
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, payload)
}

export const SettingsClient = {
  getMySettings,
  putUpdateGeneralSettings,
}
