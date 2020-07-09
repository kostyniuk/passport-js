export default (state, action) => {
  const { id, username } = action.props;

  switch (action.type) {
    case 'fillOut':
      return {
        isAuthenticated: true,
        id,
        username,
      };
    default: {
      return state;
    }
  }
};
