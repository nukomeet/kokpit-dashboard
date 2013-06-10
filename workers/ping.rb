require './settings'

class Ping
  include Sidekiq::Worker
  include App::Base

  sidekiq_options queue: :kokpit

  def perform()
    self.notify({ value: rand(100) })
  end
end
