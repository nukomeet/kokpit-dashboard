require 'clockwork'
require 'sidekiq'
require 'json'

Dir["workers/*"].each { |f| load f }

module Clockwork
  # with Sidekiq (recommended)
  # handler { |worker| Object.const_get(worker).perform_async() }

  # Heroku compatible (never do it in production)
  handler { |worker| Object.const_get(worker).new.perform() }

  every(30.seconds, 'TwitterFollowersCount')
  every(5.seconds, 'Ping')
end
