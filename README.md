Kokpit
======

A simple dashboard framework written in AngularJS.

## Requirements

You need Ruby 1.9.3, NodeJS and Redis running and up.

## How to Use

```
git clone https://github.com/nukomeet/kokpit
```

```
cd kokpit
bundle
npm install
```

Run it as:

```
foreman start
```

Web application will be accessible at `localhost:5000`.

## Backend

Workers use Sidekiq. Add your worker to `workers/` directory and define its
frequency in `clock.rb`.

## How-To

### Deploy on Heroku

#### Development Mode (1 process)

Comment this line:

```
handler { |worker| Object.const_get(worker).perform_async() }
```

and uncomment this one:

```
handler { |worker| Object.const_get(worker).new.perform() }
```

From `Procfile` remove this line:

```
worker: bundle exec sidekiq -r ./clock.rb -q kokpit
```

#### Production Mode

```
heroku create NAME
git push heroku master
heroku ps:scale clock=1 worker=1 web=1
```

