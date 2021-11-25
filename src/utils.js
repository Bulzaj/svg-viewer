export const pan = (dx, dy, transformMatrix) => {
  if (!Array.isArray(transformMatrix))
    throw new Error('Transform matrix must be type of array')

  const newTransformMatrix = [...transformMatrix]

  newTransformMatrix[4] += dx
  newTransformMatrix[5] += dy

  return newTransformMatrix
}

export const zoom = (zoomFactor, zoomPointX, zoomPointY, transformMatrix) => {
  if (!Array.isArray(transformMatrix))
    throw new Error('Transform matrix must be type of array')

  const scale = transformMatrix[0]
  const x = transformMatrix[4]
  const y = transformMatrix[5]

  const newScale = scale * zoomFactor
  const newX = zoomPointX - ((zoomPointX - x) * newScale) / scale
  const newY = zoomPointY - ((zoomPointY - y) * newScale) / scale

  const newTransformMatrix = [...transformMatrix]
  newTransformMatrix[0] = newScale
  newTransformMatrix[3] = newScale
  newTransformMatrix[4] = newX
  newTransformMatrix[5] = newY

  return newTransformMatrix
}
