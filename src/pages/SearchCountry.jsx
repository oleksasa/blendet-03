import {
  Container,
  Heading,
  Section,
  SearchForm,
  CountryList,
  Loader,
} from 'components';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) return;
    const getCountries = async () => {
      setLoading(true);
      try {
        const data = await fetchByRegion(value);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, [value]);

  const handleSubmit = value => {
    setValue(value);
  };
  return (
    <Section>
      <Container>
        <SearchForm handleSubmit={handleSubmit} />
        <CountryList countries={countries} />
        {error && <Heading title={error} />}
        {loading && <Loader />}
      </Container>
    </Section>
  );
};
