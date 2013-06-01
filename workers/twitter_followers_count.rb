require 'net/http'
require 'json'
require 'httparty'

class TwitterFollowersCount
  include Sidekiq::Worker

  sidekiq_options queue: :kokpit

  HANDLE = 'nukomeet'

  def perform()
    name = URI::encode(HANDLE)

    response = HTTParty.get("http://api.twitter.com/1/users/lookup.json?screen_name=#{name}")

    if response.code == 200
      count = JSON.parse(response.body)[0]['followers_count']

      if count
        HTTParty.post(Settings.endpoint + '/widgets/twitter_followers_count', { value: count })
      end
    end
  end
end
