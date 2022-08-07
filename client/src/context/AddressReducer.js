export const addressReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "add":
      return [...state, payload];
    case "remove":
      return state.filter((entry) => entry._id !== payload._id);
    case "update":
      return state.map((entry) =>
        entry._id === payload._id ? payload : entry
      );
    default:
      return state;
  }
};
