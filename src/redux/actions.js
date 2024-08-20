export const addWidget = (categoryName, widgetName, widgetText) => ({
    type: 'ADD_WIDGET',
    payload: { categoryName, widgetName, widgetText }
  });
  
  export const REMOVE_WIDGET = 'REMOVE_WIDGET';

  export const removeWidget = (id) => ({
    type: REMOVE_WIDGET,
    payload: id,
  });
  
  
  export const ADD_SELECTED_DATA = 'ADD_SELECTED_DATA';

  export const addSelectedData = (selectedData) => {
    //console.log(selectedData); 
  
    return {
      type: ADD_SELECTED_DATA,
      payload: Array.isArray(selectedData) ? selectedData : [selectedData], 
    };
  };
  export const ADD_SELECTED_ID = 'ADD_SELECTED_ID';
  export const addWidgetId =(selectedWidgetId)=>({
    type:ADD_SELECTED_ID,
    payload: Array.isArray(selectedWidgetId) ? selectedWidgetId : [selectedWidgetId],
  })

  
  export const ADD_SEARCH_RECORD = 'ADD_SEARCH_RECORD';
  export const addSearchRecord= (query) => ({
    type: ADD_SEARCH_RECORD,
    payload: query,
  });