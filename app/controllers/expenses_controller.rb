class ExpensesController < ApplicationController

    def show 
        user = find_user 
        render json: user.expenses, status: :ok  
    end

    def create 
        user = find_user 
        category = find_category
        expense = user.expenses.create!(expense_params.merge(category: category))
        render json: expense, status: :created
    end

    def update 
        expense = find_expense
        category = find_category
        expense.update!(expense_params.merge(category: category))
        render json: expense, status: :accepted 
    end

    def destroy 
        expense = find_expense
        expense.destroy 
        head :no_content 
    end

    private 

    def expense_params 
        params.permit(:name, :cost)
    end

    def find_user 
        User.find_by(id: params[:id])
    end

    def find_expense 
        Expense.find(params[:id])
    end

    def find_category
        Category.find_by(category: params[:category])
    end

end
