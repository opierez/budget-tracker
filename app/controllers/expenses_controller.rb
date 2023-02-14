class ExpensesController < ApplicationController

    def show 
        user = find_user 
        render json: user.expenses, status: :ok  
    end

    def create 
        user = find_user 
        category = Category.find_by(category: params[:category])
        expense = user.expenses.create!(expense_params.merge(category: category))
        render json: expense, status: :created
    end

    private 

    def expense_params 
        params.permit(:name, :cost)
    end

    def find_user 
        User.find_by(id: params[:id])
    end

end
