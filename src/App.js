import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading';

function App() {
  const [query, setQuery] = useState({ q: 'bogota' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';
      setLoading(true);
      toast.info('Fetching weather for ' + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
        setLoading(false);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-500 to-blue-400';
    const threshold = units === 'metric' ? 26 : 80;
    if (weather.temp <= threshold) return 'from-cyan-500 to-blue-400';

    return 'from-yellow-500 to-orange-500';
  };

  return (
    <div>
      <div
        className={`mx-auto max-w-md my-4 py-1 px-8 bg-gradient-to-br from-cyan-500 to-blue-400 h-fit shadow-md shadow-gray-400 rounded-lg`}
      >
        <div className="flex flex-row items-center justify-center text-white">
          <p className="ml-5 text-white text-center text-4xl font-medium">
            Weather App
          </p>
          <img
            src="http://openweathermap.org/img/wn/02d@2x.png"
            alt="Logo weather app"
          />
        </div>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        weather && (
          <div
            className={`mx-auto max-w-md my-4 py-6 px-8 bg-gradient-to-br  h-fit shadow-md shadow-gray-400 ${formatBackground()} rounded-lg`}
          >
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} />

            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )
      )}

      <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
