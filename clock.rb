require 'clockwork'
require 'sidekiq'
require 'json'

Dir["workers/*"].each { |f| load f }

module Clockwork
  handler { |worker| Object.const_get(worker).perform_async() }

  every(30.seconds, 'TwitterFollowersCount')
  every(5.seconds, 'Ping')
end
