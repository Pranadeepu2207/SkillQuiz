const baseUrl = import.meta.env.VITE_APP_API_URL
console.log("basurl:", baseUrl)

export const apiUrls = {
    registerApi: baseUrl + '/user/register',
    loginApi: baseUrl + '/user/login'
}