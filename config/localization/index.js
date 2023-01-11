import { config } from '../environment'
import { localization as localizationForPixSite } from './pix-site'
import { localization as localizationForPixPro } from './pix-pro'

export const localization = config.isPixSite
  ? localizationForPixSite
  : localizationForPixPro
