type CoordinateDegrees = {
  degrees: number
  minutes: number
  seconds: number
}

export function decimalCoordinateToDegrees(value: number): CoordinateDegrees {
  const degrees = Math.floor(value)
  const degreesRest = value - degrees
  const minutesWithSeconds = degreesRest * 60

  const minutes = Math.floor(minutesWithSeconds)
  const minutesRest = minutesWithSeconds - minutes
  const seconds = Math.round(minutesRest * 60)

  return { degrees, minutes, seconds }
}
