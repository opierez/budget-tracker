puts "🌱 Seeding data..."

# # user data
brittany = User.create(username: "bcatone", password: "pw456", first_name: "Brittany", last_name: "Catone", city: "Charlotte", state: "North Carolina", postal_code: "28105", budget: 4000)
olivia = User.create(username: "olive", password: "pw789", first_name: "Olivia", last_name: "Perez", city: "Austin", state: "Texas", postal_code: "73301", budget: 3800)
chloe = User.create(username: "chloexoxo", password: "parisxo123", first_name: "Chloe", last_name: "Peccorino" , city: "Beacon", state: "New York", postal_code: "12508", budget: 5000)

# category data
housing = Category.create(category: "Housing", fixed?: true)
transportation = Category.create(category: "Transportation", fixed?: true)
food = Category.create(category: "Food", fixed?: true)
healthcare = Category.create(category: "Healthcare", fixed?: true)
debt = Category.create(category: "Debt Repayment", fixed?: true)
savings = Category.create(category: "Savings", fixed?: true)
investments = Category.create(category: "Investments", fixed?: true)
utilities = Category.create(category: "Utilities", fixed?: true)
clothing = Category.create(category: "Clothing", fixed?: true)
vacation = Category.create(category: "Vacation", fixed?: true)
recreational = Category.create(category: "Recreational Spending", fixed?: true)

# expense data
olivia_housing = Expense.create(name: "Rent", cost: 800, user_id: olivia.id, category_id: housing.id)
olivia_food = Expense.create(name: "Ramen", cost: 15, user_id: olivia.id, category_id: food.id)
brittany_vacation = Expense.create(name: "London Trip", cost: 200, user_id: brittany.id, category_id: vacation.id)
brittany_utilities = Expense.create(name: "Internet", cost: 40, user_id: brittany.id, category_id: utilities.id)
chloe_investments = Expense.create(name: "Roth IRA", cost: 400, user_id: chloe.id, category_id: investments.id)
chloe_healthcare = Expense.create(name: "Doctor appointment", cost: 20, user_id: chloe.id, category_id: healthcare.id)


puts "✅ Done seeding!"