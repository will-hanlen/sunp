export default function DayWeather({
  day,
  temp,
  wind,
  main,
  desc,
}) {

  function mainEmoji() {
    switch(main) {
      case "Thunderstorm":
        return "⛈️";
      case "Clear":
        return "🔵";
      case "Drizzle":
        return "☂️";
      case "Rain":
        return "☂️";
      case "Snow":
        return "❄️";
      case "Clouds":
        return "☁️";
      default:
        return "⚪️";
    }
  }
  
  return (
    <div className="flex flex-col my-6">
      <strong>{ day.toUpperCase() }</strong>
      <span>🌡️{ Math.round(temp) }&deg; F</span>
      <span>{mainEmoji()} { desc }</span>
      <span>💨 { Math.round(wind) } mph winds</span>
    </div>
  )
}
