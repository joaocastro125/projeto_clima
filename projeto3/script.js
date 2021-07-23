document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()
    let input = document.querySelector('#searchInput').value
    if (input !== '') {
        clear()
        showWarning('carregando...')
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${decodeURI(input)}&appid=9ec753bbc46cc8e57811d88fe31fa2f3&units=metric&lang=pt_br`
        let results = await fetch(url)
        let json = await results.json()
        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {

            clear()
            showWarning('não encontramos esta localização')
        }
    } else {
        clear()
    }
})
function showInfo(json) {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'

}

function clear() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}