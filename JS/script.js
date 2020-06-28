(function () {
    const conditions = {
        Clear: 'sun.svg',
        Rain: 'rain.svg'
    }

    const request = {
        baseUrl: 'http://api.openweathermap.org/data/2.5/weather',
        APPID: '46c656b00d844706a4dbded16e2ea006',
        'Content-Type': 'application/json'
    }

    const form = document.forms.weather;
    let mainTitle = document.querySelector('.main__title');
    let feelsLike = document.querySelector('#feelsLike');
    let windSpeed = document.querySelector('#windSpeed');
    let humidity = document.querySelector('#humidity');
    let mainTemp = document.querySelector('.temperature-info__temp');
    let tempDescription = document.querySelector('.temperature-info__desc');
    let weatherImage = document.querySelector('.temperature-info__logo');

    function setAdditionalInfo(mainInfo, wind) {
        feelsLike.textContent = Math.round(mainInfo.feels_like - 273) + ' °C';
        windSpeed.textContent = wind.speed + ' m/s';
        humidity.textContent = mainInfo.humidity + ' %';
    }

    function setMainInfo(degrees, description) {
        mainTemp.textContent = Math.round(degrees.temp - 273) + ' °C';
        tempDescription.textContent = description[0].main;
        weatherImage.src = `url(./images/${conditions[description[0].main]})`;
    }

    function setCityName(name) {
        mainTitle.textContent = name;
    }

    function getData(city) {
        fetch(`${request.baseUrl}?q=${city}&APPID=${request.APPID}`)
            .then(res => {
                if (!res.ok) {
                    return Promise.reject(res.status);
                } else {
                    return res.json();
                }
            })
            .then(res => {
                setAdditionalInfo(res.main, res.wind);
                setMainInfo(res.main, res.weather);
                setCityName(res.name);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function sendForm(evt) {
        evt.preventDefault();

        const input = form.elements.city;
        const cityName = input.value;

        getData(cityName);
    }

    form.addEventListener('submit', sendForm);
}
)();
