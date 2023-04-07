class User < ApplicationRecord
    has_secure_password

    has_many :expenses, dependent: :destroy  
    has_many :categories, through: :expenses 

    validates :username, :first_name, :last_name, :city, :state, :postal_code, :budget, presence: true
    validates :password, presence: true, on: :create # password validation only applies on create
    validates_uniqueness_of :username, message: "is invalid"
    validates :budget, numericality: { greater_than: 0 }
     
end
