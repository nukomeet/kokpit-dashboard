Kokpit
======

A simple dashboard framework written in AngularJS.

## How to Use

```
git clone https://github.com/nukomeet/kokpit
```

```
cd kokpit
bundle
```

Run it as:

```
foreman start
```

Web application will be accessible at `localhost:5000`.

## Requirements

You need Ruby 1.9.3, NodeJS and Redis running and up.

## Backend

Workers use Sidekiq. Add your worker to `workers/` directory and define its
frequency in `clock.rb`.

