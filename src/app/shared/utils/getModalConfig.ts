export function getModalConfig(width: number, height: number, modalClass: string, data?: any): any {
  return {
    width: `${width}px`,
    height: `${height}px`,
    panelClass: modalClass,
    data: data,
  }
}
