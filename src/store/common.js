import * as TYPE from './types';

const initialState = {
    reservations: [],
    companies: [],
    courtTypes: [],
    locationCourts: [],
    locations: [],
    locationDetail: {},
    courtDetail: {},
    cities: [],
    detailLoading: false,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TYPE.COMMON_GET_COMPANIES_START:
            return { ...state, loading: true, companies: [] };
        case TYPE.COMMON_GET_COMPANIES_SUCCESS:
            return { ...state, loading: false, companies: action.payload.companies };
        case TYPE.COMMON_GET_COMPANIES_FAIL:
            return { ...state, loading: false, companies: [] };

        case TYPE.COMMON_GET_COURT_TYPES_START:
            return { ...state, loading: true, courtTypes: [] };
        case TYPE.COMMON_GET_COURT_TYPES_SUCCESS:
            return { ...state, loading: false, courtTypes: action.payload.courtTypes };
        case TYPE.COMMON_GET_COURT_TYPES_FAIL:
            return { ...state, loading: false, courtTypes: [] };

        case TYPE.COMMON_GET_LOCATIONS_START:
            return { ...state, loading: true, locations: [] };
        case TYPE.COMMON_GET_LOCATIONS_SUCCESS:
            return { ...state, loading: false, locations: action.payload.locations };
        case TYPE.COMMON_GET_LOCATIONS_FAIL:
            return { ...state, loading: false, locations: [] };

        case TYPE.COMMON_GET_COURTS_START:
            return { ...state, loading: true, locationCourts: [] };
        case TYPE.COMMON_GET_COURTS_SUCCESS:
            return { ...state, loading: false, locationCourts: action.payload.locationCourts };
        case TYPE.COMMON_GET_COURTS_FAIL:
            return { ...state, loading: false, locationCourts: [] };

        case TYPE.COMMON_GET_COURT_DETAIL_START:
            return { ...state, detailLoading: true, courtDetail: {} };
        case TYPE.COMMON_GET_COURT_DETAIL_SUCCESS:
            return { ...state, detailLoading: false, courtDetail: action.payload.courtDetail };
        case TYPE.COMMON_GET_COURT_DETAIL_FAIL:
            return { ...state, detailLoading: false, courtDetail: {} };

        case TYPE.COMMON_GET_LOCATION_DETAIL_START:
            return { ...state, detailLoading: true, locationDetail: {} };
        case TYPE.COMMON_GET_LOCATION_DETAIL_SUCCESS:
            return { ...state, detailLoading: false, locationDetail: action.payload.locationDetail };
        case TYPE.COMMON_GET_LOCATION_DETAIL_FAIL:
            return { ...state, detailLoading: false, locationDetail: {} };

        case TYPE.COMMON_GET_CITIES_START:
            return { ...state, loading: true, cities: [] };
        case TYPE.COMMON_GET_CITIES_SUCCESS:
            return { ...state, loading: false, cities: action.payload.cities };
        case TYPE.COMMON_GET_CITIES_FAIL:
            return { ...state, loading: false, cities: {} };

        case TYPE.COMMON_GET_RESERVATIONS_START:
            return { ...state, loading: true, reservations: [] };
        case TYPE.COMMON_GET_RESERVATIONS_SUCCESS:
            return { ...state, loading: false, reservations: action.payload.reservations };
        case TYPE.COMMON_GET_RESERVATIONS_FAIL:
            return { ...state, loading: false, reservations: [] };

        default:
            return state;
    }
}