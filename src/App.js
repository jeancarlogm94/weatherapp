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

function App() {
  const [query, setQuery] = useState({ q: 'bogota' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.';

      toast.info('Fetching weather for ' + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-600 to-blue-700';
    const threshold = units === 'metric' ? 25 : 60;
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-700';

    return 'from-yellow-600 to-orange-700';
  };

  return (
    <div>
      <div
        className={`mx-auto max-w-md my-4 pt-5 pb-1 px-8 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} rounded-lg `}
      >
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>

      {weather && (
        <div
          className={`mx-auto max-w-md my-4 py-6 px-8 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} rounded-lg `}
        >
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}

      <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
