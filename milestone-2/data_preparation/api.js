async function fetchAPI(month,date,time) {
    let response = await fetch(`https://api.data.gov.sg/v1/transport/carpark-availability?date_time=2020-${month}-${date}T${time}%3A00%3A00`)

    // Check if able to retrieve data
    if (response.status === 200) {
      let data = await response.text() // Wait for data to be retrieve and store in date
      //console.log(data)
      return data
    } else console.log(response.statusText) // Failure in retrieving data due to response error
  }


async function printdata(month,date,time){
    let item = await fetchAPI(month,date,time)
    const obj = JSON.parse(item)
    const carparkdatadict = obj.items[0].carpark_data
    var size = Object.keys(carparkdatadict).length;
    //console.log(carparkdatadict)

    var totallots1 = 0
    var totalavalots = 0

    for (let i=0; i<size; i++){
         totallots1 += parseInt(carparkdatadict[i].carpark_info[0].total_lots)
         totalavalots += parseInt(carparkdatadict[i].carpark_info[0].lots_available)
         //console.log(carparkdatadict[i].carpark_info[0].total_lots)
    }
    console.log("total lots: " + totallots1 + " " + "ava lots: " +totalavalots)
}

let month = "07"
let date = "04"
let time = "09"

printdata(month,date,time)