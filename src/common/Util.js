export default {
  timestamp2Date (timestamp) {
    // console.log(timestamp)
    let date = new Date(timestamp)
    // console.log(date)
    let year = date.getFullYear()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return year + '-' + month + '-' + day
  },
  cent2yuan (cent) {
    return parseFloat(cent / 100)
  }
}
