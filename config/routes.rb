Rails.application.routes.draw do
  devise_for :users
  # get 'pages/root'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "pages#root"
end
