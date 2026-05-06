const baseUrl = import.meta.env.VITE_APP_API_URL
console.log("basurl:", baseUrl)

export const apiUrls = {
    registerApi: baseUrl + '/user/register',
    loginApi: baseUrl + '/user/login',
    getSkillsApi: baseUrl + '/skills',
    getLevelsApi: baseUrl + '/levels',
    getQuestionsApi: (skillId, levelId) => baseUrl + `/quiz/questions?skillId=${skillId}&levelId=${levelId}`
}