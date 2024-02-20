export const setSiteSettings = (siteSettings) => {
    console.log(siteSettings)
    return {
        type: "SET_SITE_SETTINGS",
        payload: siteSettings
    }
}