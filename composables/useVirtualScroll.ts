export const useVirtualScroll = (view: HTMLElement, viewSize: any, data: any, rowHeight: number) => {
  let startVisibleRow: number = 0
  let endVisibleRow: number = 0
  const startVisible: number = 0;
  const endVisible: number = 0

  const calculateSize = (): { width: number, height: number } => {
    const size = { width: viewSize, height: 0 }
    if (hasFieldsAndRows()) {
      return size
    }
    size.height = rowHeight * (data.rows.length + 1)
    return size
  }
  const hasFieldsAndRows = () => {
    return !(data === undefined || data.fields.length === undefined || data.rows.length === undefined)
  }


  const render = () => {
    clearView()
    calculateVisibleRows()
    renderRows()
  }

  const calculateVisibleRows = () => {
    startVisibleRow = Math.floor(startVisible / rowHeight)
    endVisibleRow = Math.ceil(endVisible / rowHeight)
  }


  const clearView = (): void => {
    view.innerHTML = ''
  }


  const renderRows = () => {
    let firstRow = startVisibleRow
    let lastRow = endVisibleRow + 1
    if (lastRow > data.rows.length - 1) {
      lastRow = data.rows.length - 1
    }
  }



  return {
    render
  }
}


