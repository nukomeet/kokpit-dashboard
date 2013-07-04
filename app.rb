require 'ostruct'
require 'httparty'

def every(freq, klass, params)
  Clockwork.every(freq, "{ \"worker\": \"#{klass}\", \"params\": #{JSON.dump(params)} }")
end

module Clockwork
  handler do |element|
    result = JSON.parse(element, symbolize_names: true)
    Object.const_get(result[:worker]).new.perform(result[:params])

    # with Sidekiq (recommended)
    # Object.const_get(result[:worker]).perform_async(result[:params])
  end
end

module App
  Settings = OpenStruct.new({
    endpoint: "http://localhost:5000"
  })

  module Base

    def notify(id, h)
      ::HTTParty.post("#{App::Settings.endpoint}/widgets/#{id}", { body: h })
    end

  end
end
