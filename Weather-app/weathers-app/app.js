const request= require('request')

const address= process.argv[2]

const forecast = (address) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&appid=a961d65aac293a002e3f698ffa17dd81'

      request({url , json:true }, (error,{ body }) => {
         if(error){
             console.log('Unable to connect to weather service!')
         }
        else if (body.message) {
            console.log('Unable to find location')
        }
        else{
            console.log(body.name)
            console.log('It is currently ' +body.main.temp+ ' degress out. And feels like ' +body.main.feels_like)
        }
      })
    }

if (!address){
    return console.log('Please provide an address')
}
else{
    forecast(address)
}
    



