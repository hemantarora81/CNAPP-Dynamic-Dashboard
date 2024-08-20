import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Widget from "./Widget";
import { addWidgetId, removeWidget } from "../redux/actions";

const Category = ({ category,toggle }) => {
  const dispatch = useDispatch();
  const widgetIds = useSelector((state) => state.widgetIds);
  return (
    <React.Fragment>
      <div>
        <div key={category.id} className="flexrow categoryBox">
          {category?.widgets?.map((widget)=>(
            <div key={widget.id} className="widgetBoxContainer-filled">
              <div className="justifybetween">

            <span className="filledTitle">{widget?.name}</span>
            <span
              className="removeWidget"
              title="Remove Widget"
              onClick={() => {
                dispatch(addWidgetId(widgetIds.filter((item)=> item.widgetId !== widget.id)))
                dispatch(removeWidget(widget.id))}}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </span>
              </div>
              <Widget widget={widget}/>
              
            </div>
          ))}
    
          <div className="widgetBoxContainer-empty">
            <button
              className="addWidgetBtn"
              onClick={toggle}
            >
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
              Add Widget &nbsp;{" "}
            </button>
          </div>
        </div>
      </div>
      <div>
      </div>

    </React.Fragment>
  );
};

export default Category;
