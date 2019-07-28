const requestApps = 'REQUEST_APPS';
const receiveApps = 'RECEIVE_APPS';
const initialState = { apps: [], isLoading: false };

export const actionCreators = {
    requestApps: startDateIndex => async (dispatch, getState) => {
        if (startDateIndex === getState().apps.startDateIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }

        dispatch({ type: requestApps, startDateIndex });

        const url = `http://localhost:1337/apps`;
        const response = await fetch(url);
        const apps = await response.json();
        dispatch({ type: receiveApps, startDateIndex, apps });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestApps) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            isLoading: true
        };
    }

    if (action.type === receiveApps) {
        return {
            ...state,
            startDateIndex: action.startDateIndex,
            apps: action.apps,
            isLoading: false
        };
    }

    return state;
};
