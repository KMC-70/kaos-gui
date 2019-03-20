# KAOS Front End

Simple web-based GUI to determine satellite-to-site visibility for single points.

This is a proof-of-concept demo for [KAOS](https://github.com/KMC-70/kaos).

## Run KAOS Online

You will need a [mapbox API key](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/).

You presumably already have [KAOS](https://github.com/KMC-70/kaos) up and running somewhere
with its REST API exposed at some URL you can access.

They should go into your `.env` file:

```
REACT_APP_API_URL = http://kaos.backend.api
REACT_APP_MAP_API_KEY = your API token
```

Run KAOS locally:

```
npm start
```
