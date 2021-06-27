# Pokémon TCG Set Data Display
Pokémon TCG Set Data Display is an easy-to-use web application for filtering Pokémon TCG cards and looking at useful statistics on those cards.

## How to Use
The application is available at https://weedl.es/data.

## Development
### Requirements
- Node.js/npm (https://nodejs.org)
- A Pokémon TCG API key (https://pokemontcg.io)
### Installation & Running
- Run `npm install` in the repository
- Set your `API_KEY` environment variable to your Pokémon TCG API key
- Run `npm run build-cache` to build the card cache (only required each time a set is released)
- Run `npm start` and the application should open in your browser
### Production Builds
- Run `npm build`
- Production files will be in the `build/` directory

## Contributing
Feel free to open pull requests/issues as necessary.
