class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :name, :cost
  # has_one :user
  # has_one :category
end
