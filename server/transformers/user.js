export const userTransformer = (user) => {
    return {
        id: user.id,
        username: user.username
    }
}