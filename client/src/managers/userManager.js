import { apiUrl, fetchOptions } from '../helper'

export const submitContactInfo = async (info) => {
  return await fetch(`${apiUrl}/submit`, fetchOptions('POST', info)).then((res) => res.json())
}
