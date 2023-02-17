class Category < ApplicationRecord
    has_many :expenses 
    has_many :users, through: :expenses 

    validates :category, presence: true 
end
