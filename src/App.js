import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';
import getFormattedWeatherData, {
  iconUrlFromCode,
} from './services/weatherService';
// import CityNotFound from './components/CityNotFound';

function App() {
  const [query, setQuery] = useState({ q: 'bogota' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
        setLoading(false);
      });
    };
    fetchWeather();
  }, [query, units]);

  const formatBackgroundCard = () => {
    if (!weather) return 'from-cyan-500 to-blue-400';
    const threshold = units === 'metric' ? 26 : 80;
    if (weather.temp <= threshold) return 'from-cyan-500 to-blue-400';
    return 'from-yellow-500 to-orange-500';
  };

  return (
    <div>
      <div
        className={`mx-auto max-w-md my-3 pb-2 px-8 bg-gradient-to-br from-cyan-500 to-blue-400 h-fit shadow-md shadow-gray-300  rounded-lg`}
      >
        <div className="flex flex-row items-center justify-center text-white">
          <p className="text-white text-center text-4xl font-medium">Weather</p>
          <p className="text-white text-center text-2xl font-medium">App</p>
          <img src={iconUrlFromCode('02d')} alt="" />
        </div>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        weather && (
          <div
            className={`mx-auto max-w-md my-4 py-6 px-8 bg-gradient-to-br  h-fit shadow-md shadow-gray-300 ${formatBackgroundCard()} rounded-lg`}
          >
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )
      )}
    </div>
  );
}

export default App;
