import { config } from '../environment'
import { language as languageForPixSite } from '../language/pix-site'
import { language as languageForPixPro } from '../language/pix-pro'

export const language = config.isPixSite
  ? languageForPixSite
  : languageForPixPro
