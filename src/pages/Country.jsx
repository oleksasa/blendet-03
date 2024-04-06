import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!countryId) return;
    const getCountry = async () => {
      setLoading(true);
      try {
        const country = await fetchCountry(countryId);
        setCountry(country);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getCountry();
  }, [countryId]);

  return (
    <Section>
      <Container>
        {country && <CountryInfo country={country} />}
        {error && <Heading title="SearchCountry" bottom />}
        {loading && <Loader />}
      </Container>
    </Section>
  );
};
