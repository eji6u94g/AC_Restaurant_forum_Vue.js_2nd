import moment from "moment"

export const fromNowFilter = {
  filters: {
    fromNow(date) {
      if (!date) return '-'
      return moment(date).fromNow()
    }
  }
}