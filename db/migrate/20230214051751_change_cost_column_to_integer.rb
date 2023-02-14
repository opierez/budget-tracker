class ChangeCostColumnToInteger < ActiveRecord::Migration[7.0]
  def up
    change_column :expenses, :cost, 'integer USING CAST(cost AS integer)'
  end

  def down
    change_column :expenses, :cost, :string
  end
end
