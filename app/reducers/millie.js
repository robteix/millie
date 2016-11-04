import {
    ADD_SERVICE,
    UPDATE_SERVICE,
    CLOSE_SERVICE_DIALOG,
    MENUS_UPDATED,
    DELETE_SERVICE,
    OPEN_SERVICE_DIALOG,
	SELECT_SERVICE,
    SET_COUNTER,
    SET_SERVICES,
} from '../actions/millie';

import settings from '../utils/settings';
import uuid from 'node-uuid';
import * as UI from '../utils/ui';

let initialState = {
    services: [],
    selected: 'millie',
    editingService: {},
    menuNeedsUpdating: true,
};

export default function millie(state = initialState, action) {
    let newServices;
  switch (action.type) {
    case ADD_SERVICE:
        let service = {
            id: uuid.v1(),
            type: action.service.type,
            title: action.service.title,
            team: action.service.team,
            count: 0,
        };
        let services = [...state.services, service];

        settings.set('services', services);
        return Object.assign({}, state, {
            services: services,
        });
    case UPDATE_SERVICE: {
        let service = action.service;
        let updIndex = state.services.findIndex(x => x.id === service.id);
        if (updIndex === -1) return state;
        newServices =  [...state.services.slice(0, updIndex), service, ...state.services.slice(updIndex+1)];
        settings.set('service', newServices);
        return Object.assign({}, state, {
            services: newServices,
        });
    }
    case DELETE_SERVICE:
        let delIndex = state.services.findIndex(x => x.id === action.service);
        if (delIndex === -1) return state;
        newServices =  [...state.services.slice(0, delIndex), ...state.services.slice(delIndex+1)];
        settings.set('services', newServices);
        return Object.assign({}, state, {
            services: newServices,
        });
    case SELECT_SERVICE:
        UI.focusWebview(action.service);
    	return Object.assign({}, state, {
	        selected: action.service
        });
    case OPEN_SERVICE_DIALOG:
        return Object.assign({}, state, {
            editingService: action.service,
        });
    case CLOSE_SERVICE_DIALOG:
        return Object.assign({}, state, {
            addingService: {},
            editingService: {},
        });
    case MENUS_UPDATED:
        return Object.assign({}, state, {
            menuNeedsUpdating: false,
        });
    case SET_COUNTER:
        let unread = 0;
        newServices = state.services.map(function(s) {
            if (s.id === action.service) {
                s.count = action.count;
            }
            unread += s.count;
            return s;
        });
        UI.setBadge(unread);
        return Object.assign({}, state, {
            services: newServices,
        });
    case SET_SERVICES:
        return Object.assign({}, state, {
            services: action.services,
        });
    default:
      return state;
  }
}
