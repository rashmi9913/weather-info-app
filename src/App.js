import React, { useEffect, useState } from 'react';
import './App.css';
import cities from'./cities.json';
import CardView from './components/cardView';
import cloudImg from './cloudImg.svg';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cardClicked, setCardClicked] = useState(null);
  const apiKey = 'a6094a208dab6b0ba317e5783d750c1e';

  const handleCardClick = (cardInfo) => {
    setCardClicked(cardInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      const cityId = cities.List.map(city => city.CityCode).join(',');
      const response = await fetch(`http://api.openweathermap.org/data/2.5/group?id=${cityId}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      cacheData(data.list);
      setWeatherData(data.list);
    };

    const getCachedData = (expirationTime = 300000) => {
      const cachedData = localStorage.getItem('weatherData');
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < expirationTime) {
          setWeatherData(data);
        } else {
          localStorage.removeItem('weatherData');
        }
      }
    }
    
    const cacheData = (data) => {
      localStorage.setItem('weatherData', JSON.stringify({ data: data, timestamp: new Date().getTime() }));
    };
    
    const fetchDataWithCache = async () => {
      const cachedData = getCachedData();
    
      if (cachedData) {
        setWeatherData(cachedData.data);
      }else{
        fetchData();
      }
    };

    fetchDataWithCache();
  }, []);
  
  console.log(weatherData)
  return (
    <div className="App">
      <div className='App-body'>
        <div class='container py-4 py-md-5'>
          <div className='Header-row'>
            <img src={cloudImg} className="Cloud-img" alt="logo" />
            <h2 className='App-title'>Weather App</h2>
          </div>
          <div className="Weather-data">
            {cardClicked == null && weatherData ? (
              weatherData.map((cityData, index) => {
                if (index % 2 !== 0) {
                  return null;
                }
                return (
                  <div class="container-fluid py-2 py-md-3">
                    <div class="row justify-content-center">
                      <div class='col-md-6 pb-3 pb-md-0'>
                        <CardView key={cityData.id} cityData={cityData} onCardClick={handleCardClick} btn='close'/>
                      </div>
                      <div class='col-md-6'>
                        <CardView key={weatherData[index + 1].id} cityData={weatherData[index + 1]} onCardClick={handleCardClick} btn='close'/>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              cardClicked && weatherData ? (
                <div class="container-fluid py-2 py-md-3">
                    <div class="row justify-content-center">
                      <div class='col-md-6'>
                        <CardView cityData={cardClicked} onCardClick={handleCardClick} btn='arrow'/>
                      </div>
                    </div>
                  </div>
              ) : (
                <p>Loading weather data...</p>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
