const siteSettingsReducer = (
    state = {
      siteSettings: {},
    },
    action
  ) => {
    switch (action.type) {
      case "SET_SITE_SETTINGS":
        return { ...action.payload };
     
      default:
        return state;
    }
  };
  
  export default siteSettingsReducer;
  