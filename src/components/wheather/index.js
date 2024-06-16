import {Component} from 'react'
import { TiLocation } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { PiWindBold } from "react-icons/pi";
import { MainContainer } from "./styledcomponent";

import './index.css'

class ClimateDashBoard extends Component{
    state={mode:true,search:"",errorMsg:"",errorStatus:false,data:{},showWeather:false,date:new Date(),list:[]}
    //this is state Management 
     
    getWeatherReport=async()=>{
        const {search}=this.state
        const ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=42651f6c08c6a4dd7377a6ffbeac829b`
        const options = {
           method: 'GET',
           }
        
        const response = await fetch(ApiUrl, options)
            if (response.ok === true) {
                const data = await response.json()
               
                this.setState({data:data,errorStatus:false,showWeather:true})
                this.setState(prevState=>({list:[...prevState.list,data]}))
            }else{
                this.setState({errorMsg:response.statusText,errorStatus:true})
               
            }
    }
    //fetching api call on submit request of form
     
    ChangeMode=()=>{
        this.setState(prevState=>({mode:!prevState.mode}))
    }
    //this is toggling the theme either dark mode or light mode using Styled components


    onChangeInput=(event)=>{
        this.setState({search:event.target.value})
    }
    // Input of a search Value


    selectedItem=id=>{
        const {list}=this.state
        const filteredItem=list.find(eachItem=>(eachItem.id===id))

        this.setState({data:{...filteredItem}})
        this.setState({search:" "})
    }
    // this is previous list what we have searched so far,if we click the particular location it will show the details.

    onSubmitWeather=event=>{
        event.preventDefault()
        this.getWeatherReport()
    }
    // This is submit request of form using onSubmit event handler

render(){
        const {mode,search,errorMsg,data,errorStatus,showWeather,date,list}=this.state
        const formattedDate = date.toLocaleDateString();
        //this is local Date format

        const formattedTime = date.toLocaleTimeString();
        //this is local Time format
   
    return(
             //MainContainer is designed through styled components to toggling theme through props 
            <MainContainer mode={mode}>
                <h1 className="mainHeading">Weather Report</h1>
                <div className="topSection">
                <form onSubmit={this.onSubmitWeather} className="formContainer">
                    <input type="text" className="input" placeholder="Enter City-Name or Zip-Code" value={search} onChange={this.onChangeInput}/>
                    <button type="submit" className="weatherButton">Get Weather Report</button>
                    {errorStatus?<p className="errorMsg">{errorMsg}</p>:" "}
                </form>
                
                <div className="detailsContainer">
                    <div className={showWeather?"weatherDetails":""}>
                        <div className="location and time">
                            <div className="locationContainer">
                                <h1 className="locationName">{data.name}</h1>
                                {showWeather?<TiLocation className="locationIcon"/>:""}
                        
                            </div>
                            <div>
                                {showWeather?<h1 className="Temperature">{(data.main.temp/10).toFixed(0)} °C </h1>:""}
                            </div>
                            {showWeather?<p className="dateAndTime">{formattedDate}     {formattedTime}</p>:" "}
                        </div>
                        <div className="humidityAndWindSpeed">
                            <div className={showWeather?"humidity":""}>
                                {showWeather?<WiHumidity className="locationIcon"/>:""}
                                {showWeather?<h3>Humidity : {data.main.humidity} %</h3>:" "}
                            </div>
                                {showWeather?<h3 className={showWeather?"locationDescription":""}>{data.weather[0].description}</h3>:" "}
                            <div className={showWeather?"windSpeed":""}>
                                {showWeather?<PiWindBold className="locationIcon"/>:""}
                                {showWeather?<h3>Wind Speed : {data.wind.speed} Km/hr</h3>:" "}
                            </div>
                            
                        </div>
                    </div>
                </div>
                {mode?<button className="changeThemeDark" onClick={this.ChangeMode}>DarkMode</button>:<button className="changeThemeLight" onClick={this.ChangeMode}>LightMode</button>}
            </div>
                    <ul className="unOrderedList">
                            {list.map(eachItem=>(
                                <li className="list" onClick={()=>this.selectedItem(eachItem.id)} key={eachItem.id}>
                                     <div className="locationContainer">
                                            <h1>{eachItem.name}</h1>
                                            {showWeather?<TiLocation className="listIcon"/>:""}
                                    
                                    </div>
                                    <div>
                                        {showWeather?<h1 className="ListTemperature">{(eachItem.main.temp/10).toFixed(0)} °C </h1>:""}
                                    </div>
                                </li>
                            ))}
                    </ul>
             </MainContainer>
          

        
    )
}
}


export default ClimateDashBoard