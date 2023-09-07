
export var profileAction = (name) => {
    return {
        type: 'changeProfile',
        playload: name,
    }
}