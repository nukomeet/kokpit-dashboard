require 'ostruct'
require 'httparty'

class String
  def underscore
    self.gsub(/::/, '/').
    gsub(/([A-Z]+)([A-Z][a-z])/,'\1_\2').
    gsub(/([a-z\d])([A-Z])/,'\1_\2').
    tr("-", "_").
    downcase
  end
end

module App
  Settings = OpenStruct.new({
    endpoint: "http://localhost:5000"
  })

  module Base
    def notify(h)
      ::HTTParty.post("#{App::Settings.endpoint}/widgets/#{self.class.name.underscore}", { body: h })
    end
  end
end
