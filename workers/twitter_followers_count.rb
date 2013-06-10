require './settings'

class TwitterFollowersCount
  include Sidekiq::Worker
  include App::Base

  sidekiq_options queue: :kokpit

  PARAMS = {
    handle: 'nukomeet'
  }

  def perform()
    name = URI::encode(PARAMS[:handle])
    response = HTTParty.get("http://api.twitter.com/1/users/lookup.json?screen_name=#{name}")

    if response.code == 200
      count = JSON.parse(response.body)[0]['followers_count']
    else
      count = 0
    end

    self.notify({ value: count })
  end
end
