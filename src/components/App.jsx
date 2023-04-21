import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Layout from "./Layout";
import Searchbar from "./Searchbar";
import { fetchImages } from "./utilities/api";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import { errors } from './constants/errors';
import Error from "./Error";

export function App() {

  const [result, setResult] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async query => {
    setIsLoading(true);
    try {

    const result =  await fetchImages(query);
    setResult([...result]);
    setQuery(query);
    setPage(1);

    if(!result.length) {
      Notify.info("Sorry, we didn't find the image you requested. Try again!");
    };
      } catch {
        setError(errors.errFetch);
    } finally {
      setIsLoading(false);
    };
  };

  const handleLoadMore = async () => {
    setIsLoading(true);

    const nextPage = page + 1;
    try {
    const result =  await fetchImages(query, nextPage);

      if(!result.length) {
        Notify.info("Sorry, we didn't find the image you requested. Try again!");
      };
      setResult(s => [...s, ...result]);
      setPage(nextPage);

      } catch {
        setError(errors.errFetch);
    } finally {
      setIsLoading(false);
    };
  };

    return (

      <Layout>
        <Searchbar onSubmit={handleSubmit} />
        {result
        && <ImageGallery items={result} />}
        {isLoading && <Loader />}
        {result.length && !isLoading 
        ? <Button fetchMore={handleLoadMore} /> 
        : null}
        {error && <Error errorText={error} />}
      </Layout>
    );
};
