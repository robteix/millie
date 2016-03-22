import Services from '../utils/services';

export const ADD_SERVICE = 'ADD_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const SELECT_SERVICE = 'SELECT_SERVICE';
export const MENUS_UPDATED = 'MENUS_UPDATED';
export const CLOSE_SERVICE_DIALOG = 'CLOSE_SERVICE_DIALOG';
export const OPEN_SERVICE_DIALOG = 'OPEN_SERVICE_DIALOG';
export const SET_COUNTER = 'SET_COUNTER';
export const SET_SERVICES = 'SET_SERVICES';

export function selectService(service) {
  return {
    type: SELECT_SERVICE,
    service: service,
  };
}

export function addService(service, title, team = '') {
  return {
    type: ADD_SERVICE,
    service: {
      type: service,
      title: title,
      team: team,
      count: 0,
    }
  };
}

export function deleteService(id) {
  return {
    type: DELETE_SERVICE,
    service: id,
  };
}

export function openServiceDialog(service) {
  return {
    type: OPEN_SERVICE_DIALOG,
    service: service,
  };
}

export function closeServiceDialog() {
  return {
    type: CLOSE_SERVICE_DIALOG,
  };
}

export function setCounter(service, count) {
  return {
    type: SET_COUNTER,
    service: service,
    count: count,
  }
}

export function setServices(services) {
  return {
    type: SET_SERVICES,
    services: services,
  }
}