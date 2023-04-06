import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

const SelectField = ({ setGetData, getData,isClass }) => {
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const { allStateCityList } = useSelector((state) => state.signUpSlice.stateList);
  const sortState = (states) => {
    let sortedStates =states?.slice().sort((a, b) => (a.StateName > b.StateName ? 1 : -1));
    return sortedStates;
  };
  const sortCity = (city) => {
    let sortedCity = city.slice().sort((a, b) => (a.CityName > b.CityName ? 1 : -1));
    return sortedCity;
  };
  useEffect(() => {
    setStateList(sortState(allStateCityList?.Data));
   
   
    // if(getData.stateName){
    //   console.log("if");
    // }else{
    //   console.log("else");
    //   setCityList(sortCity(allStateCityList?.Data[0].Citys));
    // }
  }, []);
  useEffect(() => {
  console.warn(getData.stateName);
  if(getData.stateName){
    setCityList(sortCity(allStateCityList?.Data.filter(item=>item.StateName==getData.stateName)[0].Citys));
    console.log(allStateCityList?.Data.filter(item=>item.StateName==getData.stateName)[0].Citys);
  }else{
    console.log("else");
    setCityList(sortCity(allStateCityList?.Data[0].Citys));
  }
  }, [getData])
  
  return (
    <>
    <div class={isClass ? "col-lg-6" : "shopping-address-select"}>
      <div class={isClass ?"dropdown signup-select-option" :"dropdown signup-select-option select-option"}>
        <button
          class="dropdown-toggle select-toggle select-type"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {getData.stateName ? (
            <span style={{ color: "#212121" }}>{getData.stateName}</span>
          ) : (
            "Select State"
          )}
        </button>
        <div class="dropdown-menu">
          {stateList &&
            stateList.map((item, i) => (
              <button
                class="dropdown-item"
                type="button"
                value={item.StateName}
                onClick={() => {
                  setCityList(sortCity(item.Citys));
                  setGetData({
                    ...getData,
                    stateName: item.StateName,
                    stateError: false,
                    stateId: item.Id,
                    cityName: '',
                    cityId: '',
                  });
                }}
              >
                {item.StateName}
              </button>
            ))}
        </div>
        {getData.stateError && (
          <div className="text-danger select-error-align">Please Select State</div>
        )}
      </div>
    </div>
    <div class={isClass ? "col-lg-6" : "shopping-address-select"}>
      <div class={isClass ?"dropdown signup-select-option" :"dropdown signup-select-option select-option"}>
        <button
          class="dropdown-toggle select-toggle select-type"
          type="button"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          {getData.cityName ? (
            <span style={{ color: "#212121" }}>{getData.cityName}</span>
          ) : (
            "Select City"
          )}
        </button>
        <div class="dropdown-menu">
          {getData.stateName ? (
            cityList &&
            cityList.map((item, i) => (
              <button
                class="dropdown-item select select-option-value"
                type="button"
                value={item.CityName}
                onClick={() => {
                  setGetData({
                    ...getData,
                    cityName: item.CityName,
                    cityError: false,
                    cityId: item.Id,
                  });
                }}
              >
                {item.CityName}
              </button>
            ))
          ) : (
            <div />
          )}
        </div>
        {getData.cityError && (
          <div className="text-danger select-error-align">Please Select City</div>
        )}
      </div>
    </div>
  </>
  )
}

export default SelectField