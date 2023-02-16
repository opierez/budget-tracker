class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :name, :cost, presence: true 
  validates :cost, numericality: { greater_than: 0, only_integer: true }
  validates :category_id, presence: { message: "needs a category selected"} 


end
