import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from // formatToLocalTime,
// iconUrlFromCode,
'./services/weatherService';
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

  const formatBackgroundCard = () => {
    if (!weather) return 'from-cyan-500 to-blue-400';
    const threshold = units === 'metric' ? 26 : 80;
    if (weather.temp <= threshold) return 'from-cyan-500 to-blue-400';

    return 'from-yellow-500 to-orange-500';
  };

  // const formatBackgroundNav = () => {
  //   const date = new Date();
  //   const hour = date.getHours();

  //   if (date >= 0 && hour < 18) return 'from-cyan-500 to-blue-400';
  //   else return 'from-cyan-600 to-blue-700';
  // };

  // const formatLogodNav = () => {
  //   const date = new Date();
  //   const hour = date.getHours();

  //   if (date >= 0 && hour < 18) return '02d';
  //   else return '02n';
  // };

  return (
    <div>
      <div
        className={`mx-auto max-w-md my-3 pb-2 px-8 bg-gradient-to-br from-cyan-500 to-blue-400 h-fit shadow-md shadow-gray-400  rounded-lg`}
      >
        <div className="flex flex-row items-center justify-center text-white">
          <p className="text-white text-center text-4xl font-medium">Weather</p>
          <p className="text-white text-center text-2xl font-medium">App</p>
          {/* <img src={iconUrlFromCode(formatLogodNav())} alt="" /> */}
          {/* <img src={iconUrlFromCode('02d')} alt="" /> */}
          <img
            style={{ width: '100px', paddin: '' }}
            src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg"
            alt=""
          />
          {/* <img src={iconUrlFromCode('02n')} alt="" /> */}
        </div>
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      </div>

      {loading ? (
        <Loading />
      ) : (
        weather && (
          <div
            className={`mx-auto max-w-md my-4 py-6 px-8 bg-gradient-to-br  h-fit shadow-md shadow-gray-400 ${formatBackgroundCard()} rounded-lg`}
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
