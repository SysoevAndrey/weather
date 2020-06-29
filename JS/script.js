(function () {
    const conditions = {
        Clear: 'temperature-info__logo_clear',
        Rain: 'temperature-info__logo_rain',
        Clouds: 'temperature-info__logo_cloudy'
    }

    const request = {
        baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
        APPID: '46c656b00d844706a4dbded16e2ea006',
        'Content-Type': 'application/json'
    }

    const days = {
        1: 'MON',
        2: 'TUE',
        3: 'WED',
        4: 'THU',
        5: 'FRI',
        6: 'SAT',
        7: 'SUN',
    }

    const months = {
        1: 'January',
        2: 'Febraury',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    const form = document.forms.weather;
    let mainTitle = document.querySelector('.main__title');
    let feelsLike = document.querySelector('#feelsLike');
    let windSpeed = document.querySelector('#windSpeed');
    let humidity = document.querySelector('#humidity');
    let mainTemp = document.querySelector('.temperature-info__temp');
    let tempDescription = document.querySelector('.temperature-info__desc');
    let weatherImage = document.querySelector('.temperature-info__logo');
    let currentTime = document.querySelector('.temperature-info__time');
    let currentDate = document.querySelector('.temperature-info__date');

    function setAdditionalInfo(mainInfo, wind) {
        feelsLike.textContent = Math.round(mainInfo.feels_like - 273) + ' °C';
        windSpeed.textContent = wind.speed + ' m/s';
        humidity.textContent = mainInfo.humidity + ' %';
    }

    function getCurrentDate() {
        const date = new Date();
        currentTime.textContent = date.getHours() + ' : ' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        currentDate.textContent = days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    }

    function setMainInfo(degrees, description) {
        mainTemp.textContent = Math.round(degrees.temp - 273) + ' °C';
        tempDescription.textContent = description[0].main;
        weatherImage.classList.remove(weatherImage.classList.item(1));
        weatherImage.classList.add(`${conditions[description[0].main]}`);
        getCurrentDate();
        setInterval(getCurrentDate, 500);
    }

    function setCityName(name) {
        mainTitle.textContent = name;
    }

    function resetData() {
        mainTitle.textContent = 'The city is not found';
        feelsLike.textContent = '-';
        windSpeed.textContent = '-';
        humidity.textContent = '-';
        mainTemp.textContent = '-';
        tempDescription.textContent = '';
        weatherImage.classList.remove(weatherImage.classList.item(1));
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
                resetData();
            });
    }

    function sendForm(evt) {
        evt.preventDefault();

        const input = form.elements.city;
        const cityName = input.value;

        getData(cityName);

        input.blur();
        input.value = '';
    }

    form.addEventListener('submit', sendForm);
}
)();
