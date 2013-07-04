require 'clockwork'
require 'sidekiq'
require 'json'

require './app'

Dir["workers/*"].each { |f| load f }

every(1.minute, TwitterFollowersCount, { id: "twitter-nukomeet", handle: "nukomeet" })
every(1.minute, TwitterFollowersCount, { id: "twitter-rupy", handle: "rupy" })
every(1.minute, FacebookLikes, { id: "fb-rupy", page_name: "rupy.conference" })
every(5.seconds, Ping, { id: "ping" })
