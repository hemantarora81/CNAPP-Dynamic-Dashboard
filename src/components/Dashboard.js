import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header/Header';
import Category from './Category';

const Dashboard = () => {
  const categories = useSelector((state) => state.categories);
  const widgetIds = useSelector((state) => state.widgetIds);
  let searchRecord = useSelector((state) => state.searchRecord);
  const [openSidebar, setisOpenSidebar] = useState(false);
  let [filteredCategories, setFilteredCategories] = useState([]);
  
  const toggle = () => setisOpenSidebar(!openSidebar);
  
  useEffect(() => {
    const widgetIdsToKeep = widgetIds?.filter(item => item.checked).map(item => item.widgetId);
  
    const copiedCategories = JSON.parse(JSON.stringify(categories));
  
    copiedCategories?.forEach(dashboard => {
      dashboard.widgets = dashboard?.widgets?.filter(widget => widgetIdsToKeep.includes(widget.id));
    });
  // Remove duplicate categories
    const uniqueCategories = Array.from(
      copiedCategories.reduce((map, category) => map.set(category.id, category), new Map()).values()
    );

    let filteredData =
    searchRecord?.length < 1
      ? uniqueCategories
      :  uniqueCategories.reduce((acc, parentCategory) => {
              const filteredWidgets = parentCategory.widgets.filter(widget =>
                widget.name.toLowerCase().includes(searchRecord.toLowerCase())
              );
        
              if (filteredWidgets.length > 0) {
                acc.push({
                  ...parentCategory,
                  widgets: filteredWidgets
                });
              }
        
              return acc;
            }, []);
    setFilteredCategories(filteredData);
  
  }, [widgetIds, categories, searchRecord]);
  
 
  return (
    <>
      <Header searchRecord={searchRecord}/>
      <div className="dashboardContainer">
        {/* WidgetHeader */}
        <div className="widgetHeader">
          <div className="widgetTitle">CNAPP Dashboard</div>
          <div className="widgetContainerBox">
            <button className="addWidgetBtn" onClick={toggle}>
              Add Widget &nbsp;{" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="10"
                viewBox="0 0 512 512"
                height="15px"
                width="15px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 112v288m144-144H112"
                ></path>
              </svg>
            </button> 
            <button className="addWidgetBtn">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"  height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
            </button> 
            <button className="addWidgetBtn">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg>
            </button>
            <div className="flexrow btndropdownCustom">
                <div className="flexrow" >

            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="15px" width="15px" xmlns="http://www.w3.org/2000/svg"><path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>
       
            <svg style={{rotate:"90deg"}} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="15px" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M400 256H112"></path></svg>
                </div>
            <select name="" id="">
                    <option value="">Last 2 days</option>
                    </select>
            </div>
           
          </div>
        </div>
        <div className='widgetContainer'>
        {filteredCategories?.map((category,index)=>(
          <>
           <p className="widgetContainer-Title">{category.name}</p>
          <div className='widgetContainer-Box' key={index}>
           
            <Category category={category} toggle={toggle}/>
           
          </div>
           
          </>
        ))}
       
        </div>
      </div>
      {openSidebar&&
      <Sidebar open={openSidebar} toggle={toggle} />
      }

    </>
  );
};

export default Dashboard;
