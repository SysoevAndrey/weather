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
                console.log(res);
                // setAdditionalInfo(res);
                // setMainInfo(res);
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
