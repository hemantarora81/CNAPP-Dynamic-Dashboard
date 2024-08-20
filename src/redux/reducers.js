import { ADD_SEARCH_RECORD, ADD_SELECTED_DATA, ADD_SELECTED_ID, REMOVE_WIDGET } from "./actions";

const initialState = {
  categories: [],
  widgetIds:[],
  data: [],
  searchRecord:''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_DATA:
      return {
        ...state,
        categories: [...state.categories, ...action.payload],  // Spread the array into the categories array
      };
      case ADD_SELECTED_ID:
      return {
        ...state,
        widgetIds: [...state.widgetIds, ...action.payload],  // Spread the array into the categories array
      };
      case REMOVE_WIDGET:
        console.log("Action Payload ID:", action.payload);
        return {
          ...state,
          categories: state.categories.map(category => {
            const updatedWidgets = category.widgets.filter(widget => widget.id !== action.payload);
            console.log("Updated Widgets:", updatedWidgets);
            return {
              ...category,
              widgets: updatedWidgets,
            };
          }),
          widgetIds: state.widgetIds.filter(item => item.widgetId !== action.payload),
        };
        case ADD_SEARCH_RECORD:
          return {
            ...state,
            searchRecord: action.payload // Spread the array into the categories array
          };
    default:
      return state;
  }
};

export default rootReducer;
