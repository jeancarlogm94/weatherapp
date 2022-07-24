import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Row, Col } from 'react-bootstrap';

function App() {
  const [query, setQuery] = useState({ q: 'bogota' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      await getFormattedWeatherData({ ...query, units })
        .then((data) => {
          setWeather(data);
          setLoading(false);
        })
        .catch((error) =>
          Swal.fire({
            title: '¡Sorry!',
            icon: 'error',
            text: 'No results found',
            button: 'Try again',
          })
        );
      setLoading(false);
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
    <div className="container mx-auto">
      <Row className="justify-content-md-center">
        <Col md={10}>
          <div
            className={`mx-auto text-center mt-3 mb-2 pb-2 px-2 bg-gradient-to-br from-cyan-500 to-blue-400 h-fit  rounded-lg`}
          >
            <div className="flex flex-row items-center justify-center text-white">
              <p className="text-white text-center text-4xl font-medium">
                Weather
              </p>
              <p className="text-white text-center text-3xl font-medium">App</p>
              <img className="w-30" src={iconUrlFromCode('02d')} alt="" />
            </div>
            <TopButtons setQuery={setQuery} />
            <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
          </div>
        </Col>
      </Row>
      <div>
        {loading ? (
          <Loading />
        ) : (
          weather && (
            <div>
              <Row className="justify-content-md-center">
                <Col md={5}>
                  <div>
                    <div
                      className={`my-2 py-4 bg-gradient-to-br ${formatBackgroundCard()} rounded-lg`}
                    >
                      <TimeAndLocation weather={weather} />

                      <TemperatureAndDetails weather={weather} />
                      <div>
                        <iframe
                          className="mx-auto mt-3 rounded"
                          title="map"
                          src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15905.208849639464!2d${weather.lon}!3d${weather.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1658597844873!5m2!1ses!2sco`}
                          width="600"
                          height="450"
                          style={{
                            border: 0,
                            width: 'auto',
                            maxWidth: '250px',
                            maxHeight: '250px',
                          }}
                          allowfullscreen=""
                          loading="lazy"
                          referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={5}>
                  <div>
                    <div
                      className={`my-2 py-1 px-4 bg-gradient-to-br  h-fit ${formatBackgroundCard()} rounded-lg`}
                    >
                      <div className="flex items-center mt-3 justify-center">
                        <p className="text-white text-3xl font-medium">
                          Forecast
                        </p>
                      </div>
                      <Forecast
                        title="hourly forecast"
                        items={weather.hourly}
                      />
                      <Forecast title="daily forecast" items={weather.daily} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
