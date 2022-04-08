export const emptyImageFilter = {
  filters: {
    emptyImageFilter(src) {
      console.log(src)
      if (src !== null) {
        return src
      } else {
        return 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
      }
    }
  }
}