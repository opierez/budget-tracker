class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :name, :cost, presence: true 
  validates :cost, numericality: { greater_than: 0 }

  
end
