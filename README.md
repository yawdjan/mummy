# Adriana Amy Danquah Memorial

A responsive memorial website created to celebrate the life and legacy of **Mrs. Adriana Amy Danquah**. Visitors can learn about her life, browse memories, view service information, watch the live stream, and share messages through the guestbook and tributes sections.

Live site: [obituary.adrianaamydanquah.cloud](https://obituary.adrianaamydanquah.cloud/)

## Features

- Memorial landing page with biography and highlights
- Responsive photo gallery and multimedia content
- Service and event information
- Embedded YouTube live-stream support
- Guestbook for messages from family and friends
- Tributes with categories, featured entries, pagination, and hearts/likes
- Overall memorial statistics
- Hash-based navigation suitable for static hosting and GitHub Pages
- SEO metadata, Open Graph-style site configuration, structured data, favicons, manifest, robots.txt, and sitemap

## Tech stack

- [React](https://react.dev/) 19
- [React Router](https://reactrouter.com/) with `HashRouter`
- [Create React App](https://create-react-app.dev/) and `react-scripts`
- [React YouTube](https://www.npmjs.com/package/react-youtube)
- CSS for styling and responsive layouts
- A separate HTTP API for guestbook, tribute, and statistics data

## Getting started

### Prerequisites

- Node.js 18 or newer recommended
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yawdjan/mummy.git
cd mummy
npm install
```

Create a local environment file if you need to point the frontend at a different API. Create `.env` in the project root or in the location expected by your local setup:

```dotenv
REACT_APP_API_URL=https://your-api.example.com/api
```

The application falls back to the configured production API when `REACT_APP_API_URL` is not provided. Do not commit passwords, private keys, tokens, or other secrets to the repository.

### Run locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server reloads automatically when source files change.

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server on port 3000. |
| `npm test` | Runs the test suite in interactive watch mode. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run eject` | Ejects Create React App configuration. This is irreversible and generally not recommended. |

## Project structure

```text
public/                  Static assets, metadata, icons, manifest, and sitemap
src/
├── api/                  Client services for guestbook, tributes, and statistics
├── components/           Shared navigation, footer, slideshow, and live-stream components
├── pages/
│   ├── landing/          Memorial landing page
│   ├── events/           Service and event information
│   └── multimedia/       Photo gallery and multimedia pages
├── App.js                Application routes and shared layout
├── App.css               Application-level styles
└── index.js              React entry point
```

## Routes

The application uses hash-based routes so it can be served without server-side URL rewriting:

- `#/` or `#/landing` — memorial landing page
- `#/events` — service and event information
- `#/gallery` — photo gallery

Additional landing-page sections are linked using page anchors, such as `#tributes`, `#guestbook`, and `#live-stream`.

## API configuration

The API client is defined in [`src/api/memorialapi.js`](src/api/memorialapi.js). It exposes services for:

- **Guestbook:** list messages, retrieve a message, submit a message, and heart a message
- **Tributes:** list, filter, retrieve, and submit tributes, plus retrieve categories
- **Statistics:** retrieve overall memorial statistics

Set `REACT_APP_API_URL` before starting or building the app to use a different backend. Environment variables beginning with `REACT_APP_` are bundled into the client application, so they must never contain sensitive credentials.

## Production build

Build the application with:

```bash
npm run build
```

The generated files in `build/` can be deployed to any static hosting provider. Because the app uses `HashRouter`, deployments do not need special rewrite rules for the supported routes.

Before deploying, verify that:

1. The API URL is configured for the target environment.
2. The backend allows requests from the deployed site origin (CORS).
3. Images, favicon files, and manifest paths resolve correctly.
4. The canonical URL, sitemap, and structured-data dates match the current memorial site.
5. No `.env` files or credentials are included in the build or repository.

## Testing

Run the test suite with:

```bash
npm test
```

For a production-style validation, create a build as well:

```bash
npm run build
```

## Contributing

1. Create a feature branch from `master`.
2. Make focused changes and keep memorial content accurate and respectful.
3. Run `npm test` and `npm run build` before opening a pull request.
4. Describe any API, content, or deployment configuration changes in the pull request.

## License and content

No open-source license is currently declared in this repository. Unless permission is granted by the Danquah family, memorial text, photographs, videos, and other personal content should be treated as protected and should not be reused or redistributed.
