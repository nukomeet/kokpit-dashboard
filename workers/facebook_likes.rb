class FacebookLikes
  include Sidekiq::Worker
  include App::Base

  sidekiq_options queue: :kokpit

  # params: Hash
  #   id (required): name of the widget on the screen
  #   handle (required): name of a Facebook page to count likes
  def perform(params)
    name = URI::encode(params[:page_name])
    response = HTTParty.get("http://graph.facebook.com/#{name}")

    if response.code == 200
      count = JSON.parse(response.body)['likes']
    else
      count = 0
    end

    self.notify(params[:id], { value: count })
  end
end
