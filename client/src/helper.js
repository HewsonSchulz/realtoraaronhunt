// URL of the hosted API
export const apiUrl = process.env.REACT_APP_API_URL

// generates options for fetch calls
export const fetchOptions = (method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (!!body) {
    options.body = JSON.stringify(body)
  }

  return options
}

// updates the value of a key within an object stored as React state
export const updateStateObj = (setter, key, value) => {
  setter((prevState) => ({
    ...prevState,
    [key]: value,
  }))
}
