import React from 'react';
  
function CardView({ cityData, onCardClick, btn }) {

  const handleCardClick = () => {
    onCardClick(cityData);
  };

  const handleBackClick = () => {
    onCardClick(cityData=null);
  };

  const date = new Date(cityData.dt * 1000);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ampm = date.getHours() >= 12 ? "pm" : "am";
  const hours = date.getHours() % 12 || 12;
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const formattedDate = `${hours}.${minutes}${ampm}, ${month} ${day}`;
  return (
    <div class="card overflow-hidden justify-content-center align-items-center bg-primary py-5 h-100 rounded-3" onClick={handleCardClick}>
      {btn =='close' ? (
        <button type="button" class="btn-close position-absolute top-0 end-0 mt-2 mx-2" aria-label="Close"></button>
      ) : (
        <button type="button" class="btn btn-primary hBack position-absolute top-0 start-0 mt-2 mx-2" onClick={handleBackClick}>←</button>
      )}
      <div class="card-body">
        <div class="row no-gutters">
          <div class="col-6">
            <h5 className="card-title">{cityData.name}, {cityData.sys.country}</h5>
            <p className="card-text">{cityData.id}</p>
            <p className="card-text">{formattedDate}</p>
            <p className="card-text">{cityData.weather[0].description}</p>
          </div>
          <div class="col-6">
            <h2 className="card-title">{cityData.main.temp} &deg;C</h2>
            <p className="card-text">Temp Min: {cityData.main.temp_min} &deg;C</p>
            <p className="card-text">Temp Max: {cityData.wind.temp_min} &deg;C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardView;
