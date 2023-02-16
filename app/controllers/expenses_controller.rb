class ExpensesController < ApplicationController

    def index 
        render json: User.all, status: :ok 
    end

    def show 
        user = find_user 
        render json: user.expenses, status: :ok  
    end

    def create 
        user = find_user 
        category = find_category 
        new_expense = user.expenses.create!(expense_params.merge(category: category))
        render json: new_expense, status: :created
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

    def user_categories 
        user = find_user 
        categories = user.categories.pluck(:category) # returns an array of all the user's category attribute values 
        category_count = categories.tally # counts the occurence of each category and returns a hash with the elements of the array as keys and the corresponding count as values
        render json: category_count, status: :ok 
    end

    private 

    def expense_params 
        params.permit(:name, :cost, :category)
    end

    def find_user 
        User.find_by(id: params[:id])
    end

    def find_expense 
        Expense.find(params[:id])
    end

    # used to identify if the category passed in the create expense request is fixed 
    def find_category 
        category = Category.find_by(category: params[:category])
        # if the category isn't fixed, create a new category and set fixed? attribute to false
        if category.nil? 
            new_category = Category.create!(category: params[:category], fixed?: false)
            return new_category 
        # else return the fixed category 
        else 
            return category 
        end
    end

    

end
