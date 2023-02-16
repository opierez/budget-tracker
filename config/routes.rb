Rails.application.routes.draw do
  resources :expenses 
  resources :categories, only: [:index, :show, :create]
  resources :users, only: [:show, :create]
  post '/signup', to: "users#create"
  get '/authorized_user', to: "users#show"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  get '/users/:id/categories', to: "expenses#user_categories"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
