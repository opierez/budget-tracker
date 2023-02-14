class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :city, :state, :postal_code, :budget
  has_many :expenses 
end
