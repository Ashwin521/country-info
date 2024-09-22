import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../UI/Loader";
import { getCountryIndData } from "../../api/postApi";

const CountryDetails = () => {
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    startTransition(async () => {
      const res = await getCountryIndData(params.id);
      console.log(res);

      if (res.status === 200) {
        setCountry(res.data);
      }
    });
  }, [params.id]); // Include params.id in the dependency array

  if (isPending) return <Loader />;
  if (!country) return null; // Wait for the country data before rendering

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        {country && (
          <div className="country-image grid grid-two-cols">
            <img
              src={country[0].flags?.svg}
              alt={country[0].flags?.alt || "Country flag"}
              className="flag"
            />
            <div className="country-content">
              <p className="card-title"> {country.name?.official} </p>

              <div className="infoContainer">
                <p>
                  <span className="card-description"> Native Names:</span>
                  {Object.keys(country.name?.common || {})
                    .map((key) => country[0].name.common[key].common)
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description"> Population: </span>
                  {country[0].population?.toLocaleString()}
                </p>
                <p>
                  <span className="card-description"> Region:</span>
                  {country[0].region}
                </p>
                <p>
                  <span className="card-description"> Sub Region:</span>
                  {country[0].subregion}
                </p>
                <p>
                  <span className="card-description"> Capital:</span>
                  {country[0].capital?.join(", ")}
                </p>

                <p>
                  <span className="card-description">Top Level Domain:</span>
                  {country[0].tld?.[0]}{" "}
                </p>
                <p>
                  <span className="card-description"> Currencies: </span>
                  {Object.keys(country[0].currencies.symbol || {})
                    .map((curElem) => country.currencies[curElem].name)
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description">Languages: </span>
                  {Object.keys(country.languages || {})
                    .map((key) => country[0].languages[key])
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryDetails;
