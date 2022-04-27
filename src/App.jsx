import { useState } from "react";
import "./App.css";
import { search } from "./controller";
import Loader from "./Loader";

function CardImage({ title, url, description }) {
  return (
    <div className="card-image">
      <h3 className="title">{title}</h3>
      <img src={url} alt="" />
      <p className="description">{description}</p>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("render");

  const handleChangeQuery = ({ target }) => setQuery(target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query === "") return;

    setLoading(true);

    search(query)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setResults(res.photos ?? []);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="App">
      <h1>Test React Query</h1>

      <form onSubmit={handleSearch} className="input-search">
        <input
          value={query}
          onChange={handleChangeQuery}
          className="input"
          type="text"
        />
        <input className="button" type="submit" value="Buscar" />
      </form>

      {error && <p className="error">{error.message}</p>}

      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          {results.map((result) => (
            <CardImage
              key={result.id}
              title={result.photographer}
              url={result.src.medium}
              description={result.alt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
