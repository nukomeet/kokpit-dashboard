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
    response = HTTParty.get("https://twitter.com/users/#{name}.json")

    if response.code == 200
      count = JSON.parse(response.body)['followers_count']
    else
      count = 0
    end

    self.notify({ value: count })
  end
end
