
export var profile = (state = {name: "Loading.."}, action) => {
    if (action.type === 'changeProfile') {
        return action.playload
    }
    else {
        return state
    }
}