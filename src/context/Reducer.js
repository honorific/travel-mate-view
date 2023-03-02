const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, currentUser: action.payload}
      break
    default:
      throw new Error("you didn't pass a proper action")
  }
}

export default reducer
