class CategoriesController < ApplicationController

    def index 
        render json: Category.where(fixed?: true), status: :ok 
    end

    def show 
        category = Category.find_by(id: params[:id])
        render json: category, status: :ok 
    end

    def create 
        new_category = Category.create!(category_params.merge(fixed?: false))
        render json: new_category, status: :created 
    end

    private 

    def category_params 
        params.permit(:category)
    end

end
