class User < ApplicationRecord
    has_secure_password

    has_many :expenses, dependent: :destroy  
    has_many :categories, through: :expenses 

    validates :username, :password, :first_name, :last_name, :city, :state, :postal_code, :budget, presence: true
    validates_uniqueness_of :username, message: "is invalid"
    validates :budget, numericality: { greater_than: 0 }
     
end
