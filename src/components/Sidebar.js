import React, { useState, useEffect } from 'react';
import data from '../data.json';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedData, addWidgetId, removeWidget } from '../redux/actions';

const Sidebar = ({ open, toggle }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("CSPM");
  const selectedwidgetIds= useSelector((state) => state.widgetIds); // To Get the current selected categories from Redux
  const [selectedId, setSelectedId] = useState([]);

  useEffect(()=>{
      dispatch(addWidgetId(selectedId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedId])

  const handleCheckedData = (e, id, categoryId) => {
    const { checked } = e.target;
    if (checked) {
      if (!selectedId.includes(id)) {
        setSelectedId((prev) => [...prev, { checked: true, widgetId: id, categoryId: categoryId }]);
      }
    } else {
      setSelectedId((prev) => prev.filter((item) => item.widgetId !== id));
      dispatch(removeWidget(id)); // Automatically remove widget when unchecked
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const selectedData = data?.categories.filter((category) =>  selectedId.find((item) => item.categoryId === category.id));
   
    if (selectedData?.length) {
      dispatch(addSelectedData(selectedData)); 
    }
  };
  // Get the widgets for the active tab
  const activeWidgets = data?.categories.find((item) => item.type === activeTab)?.widgets || [];
  return (
    <div className={open ? 'flyout-sidebar overflow-x-hidden' : 'd-none'}>
      <div className="sidebarHeader">
        <div>Add Widget</div>
        <span onClick={toggle} title="Close">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 384 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"></path>
          </svg>
        </span>
      </div>
      <div className="sidebarBody">
        <div className="tabs">
          {data?.categories.map((category, index) => (
            <span
              key={index}
              className={activeTab === category.type ? 'active c-pointer' : 'c-pointer'}
              onClick={() => setActiveTab(category.type)}
            >
              {category.tabName}
            </span>
          ))}
        </div>
        
        <div className="tabContent">
          {activeWidgets.map((widget) => (
            <div key={widget.id} style={{display:"flex"}}>
              <input
                type="checkbox"
                checked={selectedwidgetIds.find((item) => item.widgetId === widget.id)}
                onChange={(e) => handleCheckedData(e, widget.id, data?.categories.find((cat) => cat.type === activeTab)?.id)}
              />
              <p>{widget.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebarFooter">
        <button className="sidebarBtnConfirm" onClick={handleConfirm}>
          Confirm
        </button>
        <button className="sidebarBtnCancel" onClick={toggle}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
